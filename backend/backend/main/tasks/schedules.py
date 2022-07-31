from celery.schedules import schedule, crontab
from backend.celery import task_queue
from redbeat import RedBeatSchedulerEntry

RedBeatSchedulerEntry(
    "test_task",
    "test_task",
    schedule(30),  # every 30 seconds
    app=task_queue,
).save()
