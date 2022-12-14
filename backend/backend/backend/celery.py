from os import environ
from celery import Celery

# set the default Django settings module for the 'celery' program.
environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

task_queue = Celery("task_queue")

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
task_queue.config_from_object("django.conf:settings", namespace="CELERY")

# Load task modules from all registered Django app configs.
task_queue.autodiscover_tasks()
