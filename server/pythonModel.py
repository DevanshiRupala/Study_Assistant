# import pandas as pd
# from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.preprocessing import OneHotEncoder

# # Sample tutor data
# tutors_data = {
#     'Name': ['Tutor1', 'Tutor2', 'Tutor3', 'Tutor4', 'Tutor5'],
#     'Subject': ['Math', 'Science', 'English', 'Math', 'Physics'],
#     'Learning_Mode': ['Online', 'In-person', 'Online', 'In-person', 'Online'],
#     'Grade_Level': ['High School', 'Middle School', 'Elementary', 'High School', 'High School']
# }

# tutors_df = pd.DataFrame(tutors_data)

# # Function to recommend tutors based on student preferences
# def recommend_tutors(student_preferences, tutors_df, top_n=5):
#     # Check if the student's preferred subject is available in the tutor data
#     if student_preferences['Subject'] not in tutors_df['Subject'].unique():
#         print("No tutors available for the selected subject. Recommending tutors with similar subjects and the same Learning Mode and Grade Level.")
#         return pd.DataFrame()

#     # Filter tutors by the selected subject
#     filtered_tutors_df = tutors_df[tutors_df['Subject'] == student_preferences['Subject']]

#     # One-hot encode categorical variables
#     encoder = OneHotEncoder(handle_unknown='ignore')
#     student_preferences_encoded = encoder.fit_transform([[student_preferences['Learning_Mode'], student_preferences['Grade_Level']]])
#     tutor_encoded = encoder.transform(filtered_tutors_df[['Learning_Mode', 'Grade_Level']])

#     # Calculate cosine similarity if tutors are found
#     if not filtered_tutors_df.empty:
#         # Calculate cosine similarity
#         similarities = cosine_similarity(student_preferences_encoded, tutor_encoded)

#         # Add similarity scores to the DataFrame
#         filtered_tutors_df['Similarity'] = similarities[0]

#         # Sort tutors by similarity score (descending order)
#         recommended_tutors = filtered_tutors_df.sort_values(by='Similarity', ascending=False)

#         # Drop the 'Similarity' column
#         recommended_tutors = recommended_tutors.drop(columns=['Similarity'])

#         return recommended_tutors.head(top_n)
#     else:
#         print("No tutors available for the selected subject. Recommending tutors with similar subjects and the same Learning Mode and Grade Level.")
#         return pd.DataFrame()

# # Example input
# student_preferences = {
#     'Name': 'Student',
#     'Subject': 'Physics',
#     'Learning_Mode': 'In-person',
#     'Grade_Level': 'High School'
# }

# # Recommend tutors based on student preferences
# recommended_tutors = recommend_tutors(student_preferences, tutors_df)
# if not recommended_tutors.empty:
#     print("Recommended Tutors based on Student Preferences (sorted by similarity):")
#     print(recommended_tutors[['Name', 'Subject', 'Learning_Mode', 'Grade_Level']])


import sys
import json
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import OneHotEncoder

# Function to recommend tutors based on student preferences
def recommend_tutors(student_preferences, tutors_data, top_n=5):
    tutors_df = pd.DataFrame(tutors_data)
    # Check if the student's preferred subject is available in the tutor data
    if student_preferences['Subject'] not in tutors_df['Subject'].unique():
        print("No tutors available for the selected subject. Recommending tutors with similar subjects and the same Learning Mode and Grade Level.")
        return pd.DataFrame()

    # Filter tutors by the selected subject
    filtered_tutors_df = tutors_df[tutors_df['Subject'] == student_preferences['Subject']]

    # One-hot encode categorical variables
    encoder = OneHotEncoder(handle_unknown='ignore')
    student_preferences_encoded = encoder.fit_transform([[student_preferences['Learning_Mode'], student_preferences['Grade_Level']]])
    tutor_encoded = encoder.transform(filtered_tutors_df[['Learning_Mode', 'Grade_Level']])

    # Calculate cosine similarity if tutors are found
    if not filtered_tutors_df.empty:
        # Calculate cosine similarity
        similarities = cosine_similarity(student_preferences_encoded, tutor_encoded)

        # Add similarity scores to the DataFrame
        filtered_tutors_df['Similarity'] = similarities[0]

        # Sort tutors by similarity score (descending order)
        recommended_tutors = filtered_tutors_df.sort_values(by='Similarity', ascending=False)

        # Drop the 'Similarity' column
        recommended_tutors = recommended_tutors.drop(columns=['Similarity'])

        return recommended_tutors.head(top_n)
    else:
        print("No tutors available for the selected subject. Recommending tutors with similar subjects and the same Learning Mode and Grade Level.")
        return pd.DataFrame()

if __name__ == "__main__":
    # Read student preferences from command line arguments
    student_preferences = json.loads(sys.argv[1])
    tutors_data = json.loads(sys.argv[2])

    # Recommend tutors based on student preferences
    recommended_tutors = recommend_tutors(student_preferences, tutors_data)
    if not recommended_tutors.empty:
        print("Recommended Tutors based on Student Preferences (sorted by similarity):")
        print(recommended_tutors[['Name', 'Subject', 'Learning_Mode', 'Grade_Level']])
