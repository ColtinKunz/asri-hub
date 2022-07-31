from pytest import mark
from main import views
from . import user, anon, view_template


@mark.django_db
class TestIndex:  # define class to test index view
    def test_unauthenticated(self, anon, settings):
        """Test accessing the index without being authenticated."""
        settings.DEBUG = True

        url, view = "main:index", views.Index.as_view()
        response = view_template(anon, url, view, 403, "get")

    def test_authenticated(self, user, settings):
        """Test accessing the index after authentication."""
        settings.DEBUG = True

        url, view = "main:index", views.Index.as_view()
        response = view_template(user, url, view, 200, "get")
