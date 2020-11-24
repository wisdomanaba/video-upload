import React from 'react'
import './App.css'
// import styled from 'styled-components'
// import  socketIoClient from 'socket.io-client'


class App extends React.Component {
    constructor() {
      super()
      this.state = {
        type: "",
        classSelected: "",
        subject: "",
        term: "",
        week: "",
        topic: "",
        questions: [
            {   id: 1,
                question: "", 
                answerA: "", 
                answerB: "", 
                answerC: "", 
                answerD: "", 
                correctAnswer: "", 
                correction: "", 
                correctionImage: ""
            }
        ],
      }
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        console.log('State',this.state)

        const { type, classSelected, subject, term, week, topic, questions } = this.state;

        const data = { type, classSelected, subject, term, week, topic, questions }

        fetch('https://firstclassbrain-server.herokuapp.com/upload-test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }
    
    handleAddShareholder = () => {
      this.setState({ questions: this.state.questions.concat([{ id: this.state.questions.length + 1 }]) });
    }
    
    handleRemoveShareholder = (idx) => () => {
      this.setState({ questions: this.state.questions.filter((s, qidx) => idx !== qidx) });
    }

    onChangeEvent = (event) => {
        this.setState({...this.state, [event.target.name]: event.target.value })
    }
    
    // handleShareholderNameChange = (idx) => (evt) => {
    //   const newQuestions = this.state.questions.map((question, qidx) => {
    //     if (idx !== qidx) return question;
    //     return { ...question, name: evt.target.value };
    //   });
      
    //   this.setState({ questions: newQuestions });
    // }

    handleShareholderQuestionChange = (idx) => (evt) => {
        const newQuestions = this.state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, question: evt.target.value };
        });
        
        this.setState({ questions: newQuestions });
    }

    handleShareholderAnsweraChange = (idx) => (evt) => {
        const newQuestions = this.state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, answerA: evt.target.value };
        });
        
        this.setState({ questions: newQuestions });
    }

    handleShareholderAnswerbChange = (idx) => (evt) => {
        const newQuestions = this.state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, answerB: evt.target.value };
        });
        
        this.setState({ questions: newQuestions });
    }

    handleShareholderAnswercChange = (idx) => (evt) => {
        const newQuestions = this.state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, answerC: evt.target.value };
        });
        
        this.setState({ questions: newQuestions });
    }
    
    handleShareholderAnswerdChange = (idx) => (evt) => {
        const newQuestions = this.state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, answerD: evt.target.value };
        });
        
        this.setState({ questions: newQuestions });
    }

    handleShareholderCorrectAnswerChange = (idx) => (evt) => {
        const newQuestions = this.state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, correctAnswer: evt.target.value };
        });
        
        this.setState({ questions: newQuestions });
    }

    handleShareholderCorrectionChange = (idx) => (evt) => {
        const newQuestions = this.state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, correction: evt.target.value };
        });
        
        this.setState({ questions: newQuestions });
    }

    handleShareholderCorrectionImageChange = (idx) => (evt) => {
        const newQuestions = this.state.questions.map((shareholder, qidx) => {
          if (idx !== qidx) return shareholder;
          return { ...shareholder, correctionImage: evt.target.value };
        });
        
        this.setState({ questions: newQuestions });
    }

    
    render() {    
      return (
        <form onSubmit={this.handleSubmit}>
          <h2>Set Test</h2>

            <div className="flex">
                <div>
                    <label>Type</label>
                    <br />
                    <select name="type" value={ this.state.type } onChange={ this.onChangeEvent }>
                            <option value={3}>Assignment</option>
                            <option value="2">Mid-Term test</option>
                            <option value="3">Examination</option>
                    </select>
                </div>
                <div>
                    <label>Class</label>
                    <br />
                    <input type="text" name="classSelected" value={ this.state.classSelected } onChange={ this.onChangeEvent } />
                </div>
            </div>

            <div className="flex">
                <div>
                    <label>Subject</label>
                    <br />
                    <input type="text" name="subject" value={ this.state.subject } onChange={ this.onChangeEvent } />
                </div>
                <div>
                    <label>Term</label>
                    <br />
                    <input type="text" name="term" value={ this.state.term } onChange={ this.onChangeEvent } />
                </div>
            </div>

            <div className="flex">
                <div>
                    <label>Week</label>
                    <br />
                    <input type="text" name="week" value={ this.state.week } onChange={ this.onChangeEvent } />
                </div>
                <div>
                    <label>Topic</label>
                    <br />
                    <input type="text" name="topic" value={ this.state.topic } onChange={ this.onChangeEvent } />
                </div>
            </div>


            <br />
            <div className="question">
                <label>Questions</label>
                <br />
                {this.state.questions.map((shareholder, idx) => (
                    <div className="shareholder">
                        <div className="quest">
                            <div className="quest-in">
                                <input
                                    type="text"
                                    key={idx + 1}
                                    placeholder={`question`}
                                    value={shareholder.question}
                                    onChange={this.handleShareholderQuestionChange(idx)}
                                />
                                <input
                                    type="text"
                                    key={idx + 1}
                                    placeholder={`answerA`}
                                    value={shareholder.answerA}
                                    onChange={this.handleShareholderAnsweraChange(idx)}
                                />
                                <input
                                    type="text"
                                    key={idx + 1}
                                    placeholder={`answerB`}
                                    value={shareholder.answerB}
                                    onChange={this.handleShareholderAnswerbChange(idx)}
                                />
                                <input
                                    type="text"
                                    key={idx + 1}
                                    placeholder={`answerC`}
                                    value={shareholder.answerC}
                                    onChange={this.handleShareholderAnswercChange(idx)}
                                />
                            </div>
                            <div className="quest-in">
                                <input
                                    type="text"
                                    key={idx + 1}
                                    placeholder={`answerD`}
                                    value={shareholder.answerD}
                                    onChange={this.handleShareholderAnswerdChange(idx)}
                                />
                                <input
                                    type="text"
                                    key={idx + 1}
                                    placeholder={`correctAnswer`}
                                    value={shareholder.correctAnswer}
                                    onChange={this.handleShareholderCorrectAnswerChange(idx)}
                                />
                                <input
                                    type="text"
                                    key={idx + 1}
                                    placeholder={`correction`}
                                    value={shareholder.correction}
                                    onChange={this.handleShareholderCorrectionChange(idx)}
                                />
                                <input
                                    type="text"
                                    key={idx + 1}
                                    placeholder={`correctionImage`}
                                    value={shareholder.correctionImage}
                                    onChange={this.handleShareholderCorrectionImageChange(idx)}
                                />
                            </div>
                        </div>
                        <button type="button" onClick={this.handleRemoveShareholder(idx)} className="small">-</button>
                    </div>
                ))}
                <button type="button" onClick={this.handleAddShareholder} className="small left">Add Question</button>
            </div>
            <button>Submit</button>
        </form>
      )
    }
  }
  


export default App;




// const StyledApp = styled.div`
//     margin: 0;
//     padding: 3em 6em;
//     background: #282c34;
//     color: #fff;
// `
// const App = () => {

//     const socket = socketIoClient('http://localhost:5000')

//     socket.on('connect', () => {

//         console.log('A user new user just connected...')
    
//         socket.on('Your id', (id) => {
//             console.log('User id', id)
//         })

//         socket.emit('Listen', {message: 'Listen Cash app'})
        
//     })

//     return (
//         <StyledApp>
//             <h1>Hi</h1>
//         </StyledApp>
//     )

// }