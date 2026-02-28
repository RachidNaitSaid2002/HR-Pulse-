import pytest
from unittest.mock import patch, MagicMock
from scripts.Pipline import Predict_salary

@patch("scripts.Pipline.joblib.load")
@patch("scripts.Pipline.pd.read_csv")
def test_predict_salary_logic(mock_read_csv, mock_load):
    # Mocking the models and encoders
    mock_model = MagicMock()
    mock_model.predict.return_value = [50000]
    
    mock_le = MagicMock()
    mock_le.transform.side_effect = lambda x: [0] * len(x)
    
    # Setup mock_load to return the appropriate mock based on path
    def side_effect(path):
        if "model" in path:
            return mock_model
        return mock_le
    
    mock_load.side_effect = side_effect
    
    # Mock CSV for sectors/classes if needed
    mock_read_csv.return_value = MagicMock()
    
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
    
    assert result == 50000
    assert mock_model.predict.called
