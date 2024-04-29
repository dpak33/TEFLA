To run once repo has been cloned and opened:
cd backend,
pip install -r requirements.txt,
flask run,

cd frontend,
npm install,
ng serve

As it stands, the existing project represents a first iteration of a complex, modular application that is designed to automate the process of learning 
English as a second language. It is built using Typescript and Angular on the frontend and Python combined with SQLAlchemy and Flask on the backend. 
I've used Flask's blueprints to help organise the backend code into more modular, well-defined 'chunks'. In total, the project is constituted of several
thousand lines of code. The basic user interface on the frontend begins with a boolean-based evaluation to check whether the user is logging into
the app for the first time: if they are logging in for the first time, then they will be obliged to complete a preconfigured language-level evaluation
quiz, after completion of which the user will be assigned a specific language level on the backend. The language levels assigned to the user will 
correspond to the language levels commonly used by TEFL teachers to assess students' language levels, with the absolute beginner level starting A1 
and the most advanced level marked at C2. This level will be dynamically fetched on the frontend later when making calls to the chatGPT API to 
generate language-level-specific quizzes for the user for each of the language sub-topics: travel, work and greetings. I've created example dummy
learner content within each of the sub-topics once the user has logged into the app and completed the opening quiz. The purpose of these quizzes is 
clearly not to provide exhaustive information necessary to boost the user to the next language level as I was more interested in articularing the 
entire flow of the app so as to prove the concept, so to speak, than in actually generating educational content that would cover a standard TEFL 
syllabus. Once the user is inside one of the topic-specific sub-categories - for example, 'travel-beginner' -, they can look through the learning
material and, once satisfied that they have enough to complete the category-specific quiz, can click a button to take them through to the section
quiz. The section quizzes component is a single module that dynamically takes information from whichever topic-specific and level-specific 
sub-category the user is calling. The frontend then makes two calls to my two backend API routes - one of which generates the quiz, the other of
which evaluates the quiz. That is, one call to the chatGPT API results in the production of a series of multi-choice questions, as well as two open-ended
questions: these are rendered nicely on the frontend. The other call to the chatGPT API sends the questions along with the users answers and language-level
and asks for an evaluation of the user's category-specific level based on their score in the quiz. If the user scores above a certain threshold, 
their user level will improve in that specific category. If their user level improves within all three categories (travel, work and greetings), 
their overall level will also be updated accordingly. 
The app is still incomplete and I intend to make further modifications going forward, though I wanted to publish it in its present state regardless.
With regards to changes that still need to be made, I want to ensure that the level-specific topic categories are protected, so that, for example,
only A1-A2 users can see the travel-beginner/greetings-beginner sections and only C1-C2 users can see the travel-advanced/greetings-advanced sections.
I also need to add some form of token-based login rather than simply logging in through usernames and passwords alone, though again the project is 
still in a demo stage at the moment and this can be modified easily enough. Thirdly, I need to find some way of 
improving the API call to chat for evaluation of the quiz. At the moment, I am sending the entire object - showing the original questions and the user answers - 
along with a uniform query string to chat. The response I receive is often inaccurate and, while it returns a score that can be used to modify the user
level, this score is generally between 20 and 30 percentage points below where it should be, preventing accurate updates. I wanted the section quizzes
to be generated and, thus, evaluated dynamically to avoid users merely gaming the quiz itself, but this makes it more difficult to assure myself
of a consistent and cleanly packaged packet information to send to chat for evaluation. I notice, however, that if I send the entire object 
directly in chatGPT, the evaluation is far more accurate, so, again, this is an area that needs to be further examined at some point. Fourthly - 
and perhaps most importantly -, I still need to test the application more formally. I have tested it informally and by using Postman on the backend
but clearly the application requires proper, rigorous testing in the future. I will do this in a piecemeal manner over the next few weeks and months.
Obviously the user needs to run the app with their own chatGPT API keys. 
