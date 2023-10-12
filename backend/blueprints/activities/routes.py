from . import activities

@activities.route('/start')
def start_activities():
    return "Start Activities Page"