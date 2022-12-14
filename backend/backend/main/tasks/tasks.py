from celery import shared_task


@shared_task(name="test_task")
def test_task():
    from datetime import datetime

    return datetime.now().isoformat()
