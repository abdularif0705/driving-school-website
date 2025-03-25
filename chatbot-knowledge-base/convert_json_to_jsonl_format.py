import json

# Full dataset needs to be included here for conversion
dataset = {
    "intents": [
    {
      "tag": "greeting",
      "patterns": ["Hi", "Hello", "Hey"],
      "responses": ["Hello!", "Hi there!", "Hey! How can I assist you today?"]
    },
    {
      "tag": "goodbye",
      "patterns": ["Bye", "Goodbye", "See you later"],
      "responses": ["Goodbye!", "Take care!", "See you later!"]
    },
    {
      "tag": "thanks",
      "patterns": ["Thank you", "Thanks", "Appreciate it"],
      "responses": ["You're welcome!", "No problem!", "Glad I could help!"]
    },
    {
      "tag": "driving_school_info",
      "patterns": ["Driving school", "Enrollment", "Courses"],
      "responses": [
        "Our driving school offers a variety of courses for beginners and experienced drivers. You can find more information on our website or contact us directly for enrollment details."
      ]
    },
    {
      "tag": "schedule",
      "patterns": ["Class schedule", "Availability", "Timings"],
      "responses": [
        "Our driving school has flexible class schedules to accommodate different needs. Please visit our website or contact us for more information on class availability and timings."
      ]
    },
    {
      "tag": "driving_lesson_cost",
      "patterns": ["Cost", "Price", "Fees"],
      "responses": [
        "The cost of driving lessons varies depending on the location and the driving school. Please contact us for more information."
      ]
    },
    {
      "tag": "road_test_preparation",
      "patterns": ["Road test", "Preparation", "Practice"],
      "responses": [
        "The best way to prepare for the road test is to practice driving regularly and to study the driver's manual. You can also take a road test preparation course from our driving school."
      ]
    },
    {
      "tag": "business_hours",
      "patterns": ["Hours", "Business hours", "Open"],
      "responses": ["Our business hours are Monday-Friday, 7am-7pm."]
    },
    {
      "tag": "contact",
      "patterns": ["Contact", "Phone", "Email"],
      "responses": [
        "You can contact us by phone at 226-246-2224 or by email at rajputwindsor@gmail.com."
      ]
    },
    {
      "tag": "additional_driving_lesson_cost",
      "patterns": [
        "How much do driving lessons cost?",
        "What are the fees for driving lessons?"
      ],
      "responses": [
        "The cost of driving lessons varies depending on the course and the number of lessons you purchase. Please contact us for more information."
      ]
    },
    {
      "tag": "additional_road_test_preparation",
      "patterns": ["What is the best way to prepare for the road test?"],
      "responses": [
        "The best way to prepare for the road test is to practice driving regularly and to study the driver's manual. You can also take a road test preparation course from our driving school."
      ]
    },
    {
      "tag": "additional_business_hours",
      "patterns": ["What are your business hours?"],
      "responses": ["Our business hours are Monday-Friday, 7am-7pm."]
    },
    {
      "tag": "additional_contact",
      "patterns": ["What is the best way to contact you?"],
      "responses": [
        "You can contact us by phone at 226-246-2224 or by email at rajputwindsor@gmail.com."
      ]
    },
    {
      "tag": "driving_lessons",
      "patterns": [
        "I'm interested in taking driving lessons.",
        "Do you offer driving lessons for beginners?",
        "What is the process for enrolling in driving lessons?",
        "How much do driving lessons cost?"
      ],
      "responses": [
        "We offer driving lessons for students of all levels, from beginners to experienced drivers.",
        "To enroll in driving lessons, you can call us at 226-246-2224.",
        "The cost of driving lessons varies depending on the package you choose. The cost of a single driving class is $40/hour. However, our most popular package is 10 lessons for $450, and you get the BDE certificate for free with the package, whereas the usual price for the BDE is $250."
      ]
    },
    {
      "tag": "pricing",
      "patterns": [
        "How much do driving lessons cost?",
        "Do you offer discounts for multiple lessons?",
        "What is the cost of a driving test?"
      ],
      "responses": [
        "The cost of driving lessons varies depending on the package you choose. Please visit our website for more information.",
        "We offer a $250 discount for students who purchase a package of 10 or more lessons, and it comes with a BDE certificate which can reduce your yearly insurance by $600.",
        "The cost of a driving test is $159.75 and is paid directly to the DriveTest center. https://drivetest.ca/tests/fees/"
      ]
    },
    {
      "tag": "locations",
      "patterns": [
        "Where is your driving school located?",
        "Do you have multiple locations?",
        "What are your hours of operation?"
      ],
      "responses": [
        "Our driving school is located at 2235 Everts Ave.",
        "Our hours of operation are Monday-Friday from 7am to 7pm."
      ]
    },
    {
      "tag": "contact_information",
      "patterns": [
        "How can I contact your driving school?",
        "Do you have an email address or phone number?"
      ],
      "responses": [
        "You can contact our driving school by calling or texting us at 226-246-2224 or emailing us at rajputwindsor@gmail.com.",
        "Our website also has a contact form that you can use to send us a message."
      ]
    },
    {
      "tag": "testimonials",
      "patterns": [
        "What do your students say about your driving school?",
        "Can I read testimonials from past students?"
      ],
      "responses": [
        "We have many positive testimonials from past students. You can read them on our Google reviews.",
        "Here's a recent testimonial from one of our satisfied students: \"My experience with Rajput Driving School is an A+! Abdul Rehman is the best driving instructor and he was very patient with me. I went from being nervous to extremely confident and I passed my G2 exam on the first try! Thank you so much, Abdul!\""
      ]
    }
  ]
}

# Convert the dataset to JSONL format
jsonl_content = '\n'.join([json.dumps(intent) for intent in dataset["intents"]])

# Save the converted content to a file
jsonl_file_path = 'RajputChatbotDataset.jsonl'
with open(jsonl_file_path, 'w') as file:
    file.write(jsonl_content)

jsonl_file_path

