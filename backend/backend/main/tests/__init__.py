from django.contrib.auth.models import AnonymousUser
from django.conf import settings
from django.urls import reverse, NoReverseMatch

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.test import APIRequestFactory

from mixer.backend.django import mixer
from pytest import fixture

from json import dumps as json_dump, loads as json_load


@fixture
def anon():
    """An anonymous user representing and unauthenticated session."""
    yield AnonymousUser()


@fixture
def user():
    """A user."""
    user = mixer.blend(settings.AUTH_USER_MODEL)
    yield user
    if user.id is not None:  # check that the user wasn't already deleted
        user.hard_delete()


@fixture
def user_with_password():
    """A user whose password is 'password'."""
    user = mixer.blend(settings.AUTH_USER_MODEL, password="password")
    yield user
    if user.id is not None:  # check that the user wasn't already deleted
        user.hard_delete()


@fixture
def user_token(user):
    """A user object and an encoded token for that user (as a tuple)."""
    token = AccessToken.for_user(user)
    yield user, str(token)


def get_access_token(user, refresh=False):
    if refresh:
        return str(RefreshToken.for_user(user))
    else:
        return str(AccessToken.for_user(user))


def view_template(
    user,
    url,
    view,
    expected_status,
    method,
    request_data=None,
    cookies=None,
    view_args={},
    generic=False,
    enforce_expected_status=True,
    content_type="application/json",
):
    """
    This template contains all of the logic for testing views. It is intended
    to be called by other, more specific template functions that pre-set values
    (such as user), but can be called directly for maximum control.

    Parameters:
    :user:
        An instance of a user to use for authentication. It's recommended to
        use the user or anon fixtures defined above for this argument.
    :url:
        A string representing the path to the view that we are testing. This
        may be passed either as <app>:<name> or /path/to/view as defined in
        urls.py.
    :view:
        A view function to call with the arguments. If using class base views,
        the view function can be acquired with <view>.as_view().
    :expected_status:
        The status that should be returned by the view with these arguments.
    :method:
        The HTTP method of the request (e.g. 'get', 'post', etc.).
    :request_data:
        JSON data that is being sent to the view.
    :view_args:
        Keyword arguments to the view. For example, if a view expects an ID to
        be in the URL, then that ID can be passed into the view via the
        view_args dictionary.
    :generic:
        Flag for whether or not the view is a generic Django REST function. This
        will change how kwargs are passed into the view.
    :enforce_expected_status:
        Flag for whether or not this function should make an assertion that the
        expected status matches the response status.
    :content_type:
        The type of content being passed in request data. Used currently to call
        json_dump when content_type is `application/json`

    """

    # url might be passed as <app>:<name> or an actual url path
    try:
        # To pass kwargs to a generic view, must pass it when reversing
        if generic:
            path = reverse(url, kwargs=view_args)
        else:
            path = reverse(url)
    except NoReverseMatch:
        path = url

    # generate the request factory to simulate the HTTP request
    rf = APIRequestFactory()
    if content_type == "application/json" and request_data is not None:
        request_data = json_dump(request_data)
    request = getattr(rf, method)(
        path, request_data, enforce_csrf_checks=False, content_type=content_type
    )
    request.user = user
    if cookies is not None:
        for k in cookies:
            request.COOKIES[k] = cookies[k]

    response = view(request, **view_args)

    if enforce_expected_status:
        if response.status_code != expected_status:
            response.render()
        assert response.status_code == expected_status, response.status_code
    else:
        print("Expected status:", expected_status)
        print("Received status:", response.status_code)

    try:
        response.render()
        return json_load(response.content.decode())
    except Exception:
        return response
