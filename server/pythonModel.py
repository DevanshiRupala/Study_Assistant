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


import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer, LabelEncoder
from scipy.spatial.distance import cdist
import sys
import json

# Function to recommend tutors based on student preferences
def recommend_tutors(student_preferences, tutors_data, top_n=5):
    tutors_df = pd.DataFrame(tutors_data)
    student_subjects = student_preferences['Subjects']
    student_learning_modes = student_preferences['Learning_Mode']
    student_grade_levels = student_preferences['Grade_Level']
    
    # Filter tutors by the selected subjects
    filtered_tutors_df = tutors_df[tutors_df['Subject'].apply(lambda x: any(item in x for item in student_subjects))]

    # One-hot encode subjects
    encoder_subjects = MultiLabelBinarizer()
    subjects_encoded = encoder_subjects.fit_transform(filtered_tutors_df['Subject'])

    # Label encode learning modes
    encoder_mode = MultiLabelBinarizer()
    learning_modes_encoded = encoder_mode.fit_transform(filtered_tutors_df['Learning_Mode'])

    # Label encode grade levels
    encoder_grade = MultiLabelBinarizer()
    grade_levels_encoded = encoder_grade.fit_transform(filtered_tutors_df['Grade_Level'])

    # Label encode student preferences
    student_preferences_encoded = {
        'Learning_Mode': encoder_mode.transform([student_learning_modes]),
        'Grade_Level': encoder_grade.transform([student_grade_levels])
    }

    # Calculate cosine similarity if tutors are found
    if not filtered_tutors_df.empty:
        # Calculate cosine similarity for subjects
        similarities_subjects = cosine_similarity(subjects_encoded, encoder_subjects.transform([student_subjects]))

        # Calculate cosine similarity for learning modes
        similarities_modes = cosine_similarity(learning_modes_encoded, student_preferences_encoded['Learning_Mode'])

        # Calculate cosine similarity for grade levels
        similarities_grades = cosine_similarity(grade_levels_encoded, student_preferences_encoded['Grade_Level'])

        # Aggregate similarities for each tutor
        similarities = (similarities_subjects.squeeze() + similarities_modes.squeeze() + similarities_grades.squeeze()) / 3

        # Add similarity scores to the DataFrame
        filtered_tutors_df['Similarity'] = similarities

        # Sort tutors by similarity score (descending order)
        recommended_tutors = filtered_tutors_df.sort_values(by='Similarity', ascending=False)

        return recommended_tutors.head(top_n).drop(columns=['Similarity'])
    else:
        student_preferences_vector = {
            'Learning_Mode': student_preferences_encoded['Learning_Mode'].reshape(1, -1),
            'Grade_Level': student_preferences_encoded['Grade_Level'].reshape(1, -1)
        }
        tutor_features = filtered_tutors_df[['Learning_Mode', 'Grade_Level']].apply(lambda x: {
            'Learning_Mode': encoder_mode.transform([x['Learning_Mode']]),
            'Grade_Level': encoder_grade.transform([x['Grade_Level']])
        }, axis=1)
        tutor_features_array = pd.DataFrame(tutor_features.tolist()).fillna(0).values
        distance_matrix = {}
        for key in student_preferences_vector:
            distance_matrix[key] = cdist(student_preferences_vector[key], tutor_features_array[key], metric='euclidean')
        distance_matrix_combined = (distance_matrix['Learning_Mode'] + distance_matrix['Grade_Level']) / 2
        closest_tutor_index = distance_matrix_combined.argmin()
        closest_tutor = filtered_tutors_df.iloc[closest_tutor_index]
        print("No tutors available for the selected subjects. Recommending the most similar tutor with subjects {} and similar Learning Mode and Grade Level: {}.".format(closest_tutor['Subject'], closest_tutor[['Learning_Mode', 'Grade_Level']]))
        return closest_tutor

if __name__ == "__main__":
    # Read student preferences from command line arguments
    student_preferences = json.loads(sys.argv[1])
    tutors_data = json.loads(sys.argv[2])

    # Recommend tutors based on student preferences
    recommended_tutors = recommend_tutors(student_preferences, tutors_data)
    if not recommended_tutors.empty:
        print("Recommended Tutors based on Student Preferences (sorted by similarity):")
        print(recommended_tutors[['Name', 'Subject', 'Learning_Mode', 'Grade_Level']])
