from . import activities

@activities.route('/')
def activities_home():
    return "Activities Home Page"

@activities.route('/quiz')
def activities_quiz():
    return "Opening quiz"

@activities.route('/start')
def start_activities():
    return "Start Activities Page"