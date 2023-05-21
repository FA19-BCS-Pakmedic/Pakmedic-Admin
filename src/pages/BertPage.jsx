import { Button, Card, CardContent, Container, Grid, TextField, Typography, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'

import {Close as CloseIcon} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';


const BertPage = () => {
  
  const [passage, setPassage] = useState('');
  const [inputText, setInputText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddItem = () => {
    if (inputText.trim() !== '' && questions.length < 5) {
      setQuestions([...questions, inputText]); 
    }
    setInputText('');
  };

  const handleRemoveItem = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };


  useEffect(() => {
    if(answers.length) {
      setQuestions([]);
      setPassage('');
    }
  }, [answers])



  const handleSubmit = async () => {
    const data = {
      passage,
      questions
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/ML/bert', data);
      if(response && response.data.status === 'success') {
        const results = response.data.data.result
        const dataArray = Object.entries(results).map(([question, answer]) => ({
          question,
          answer
        }));
        setAnswers(dataArray.reverse());
      }
    }catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
     
    }


  }

  return (
    <Container>
      <Grid xs={12} sx={{marginBottom: '1rem'}}>

      <TextField
            id="my-textarea"
            label="Add a passage from which you want to extract answers."
            multiline
            rows={8}
            variant="outlined"
            fullWidth
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
          disabled={loading}

            />
            </Grid>


      
      <Grid container spacing={2}>
        <Grid container item xs={12} sm={6} md={10}>

        <TextField
          id="input"
          label="Enter a question and press enter to add it to the list."
          multiline
          value={inputText}
          onChange={handleInputChange}
          variant="outlined"
          sx={{
            width: '100%',
          }}
          disabled={loading}
          />
  </Grid>

  <Grid container item xs={12} sm={6} md={2}>
        <Button variant="outlined" onClick={handleAddItem} sx={{width: '100%'}} disabled={loading}>
          Add
        </Button>
        </Grid>
      </Grid>
      <div>
      
        {questions.map((item, index) => (
          <Card key={index} variant="outlined" sx={{ marginTop: '10px' }}>
          <CardContent sx={{display: 'flex', alignItems: 'center'}}>
            <Typography variant="body1">{item}</Typography>
            <IconButton
              onClick={() => handleRemoveItem(index)}
              sx={{ marginLeft: 'auto' }}
              disabled={loading}
            >
              <CloseIcon />
            </IconButton>
          </CardContent>
        </Card>
        ))}
       
      </div>

      
        {
          !!answers.length && 
            <Card sx={{marginTop: '1rem'}}>
              <CardContent>
                <Typography variant="h4">Answers</Typography>
                <ul>
                  {
                    answers.map((item, index) => (
                      <Container sx={{ marginTop: '0.5rem'}}>
                        <li key={index}>
                          <Typography variant="subtitle1" >
                            {item.question}
                          </Typography>
                        </li>
                        <Typography variant="body1">
                          {item.answer}
                        </Typography>
                      </Container>
                    ))
                  }
                </ul>
              </CardContent>
            </Card>
        }


      <LoadingButton variant="contained" sx={{marginTop: '1rem', width: '100%', padding: "20px 0"}} disabled={questions.length === 0 || !passage} onClick={handleSubmit} loading={loading}>
            Generate Answers
      </LoadingButton>

    </Container>
  );
}

export default BertPage;