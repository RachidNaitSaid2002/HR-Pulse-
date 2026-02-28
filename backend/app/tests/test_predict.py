import pytest
from unittest.mock import patch, MagicMock
from scripts.Pipline import Predict_salary

@patch("scripts.Pipline.joblib.load")
@patch("scripts.Pipline.pd.read_csv")
def test_predict_salary_logic(mock_read_csv, mock_load):
    """
    Test the core salary prediction logic in scripts/Pipline.py.
    This test mocks the ML models (joblib.load) and CSV data (pd.read_csv)
    to verify that the Predict_salary function correctly processes inputs
    and returns the expected predicted value.
    """
    # Step 1: Mock the behavior of ML models and encoders
    mock_model = MagicMock()
    mock_model.predict.return_value = [50000] # Mocked prediction result
    
    mock_le = MagicMock()
    # Mock LabelEncoder's transform method to return a list with a dummy encoded value
    mock_le.transform.side_effect = lambda x: [0] * len(x)
    
    # Setup mock_load to return the appropriate mock (model or encoder) based on the path
    def side_effect(path):
        if "model" in path:
            return mock_model
        return mock_le
    
    mock_load.side_effect = side_effect
    
    # Step 2: Mock CSV reading if the pipeline uses it (e.g., for mapping sectors)
    mock_read_csv.return_value = MagicMock()
    
    # Step 3: Execute the prediction function
    result = Predict_salary(
        job_description="We are looking for a Data Scientist with Python skills.",
        Founded=2010,
        Job_titel="Data Scientist",
        company_size="51 to 200 employees",
        sector="Information Technology",
        industry="Software",
        state="NY",
        rating=4.0
    )
    
    # Step 4: Verify the result and that the model was actually called
    assert result == 50000
    assert mock_model.predict.called
