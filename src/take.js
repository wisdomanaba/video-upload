import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledApp = styled.div`
    margin: 0;
    padding: 3em 6em;
    background: #282c34;
    color: #fff;
    h1 {
        margin: auto !important;
    }
    input {
        width: 300px;
        height: 20px;
        border: none
    }
    .question{margin-top: 3em;}
    .question input {
        margin: 1em;
    }
`;

const App = () => {

    const [type, setType] = useState('')
    const [classSelected, setClassSelected] = useState('')
    const [subject, setSubject] = useState('')
    const [term, setTerm] = useState('')
    const [week, setWeek] = useState('')
    const [topic,  setTopic] = useState('')
    const [questions, setQuestions] = useState([])
    const [questValue, setQuestValue] = useState({
        id: '',
        question: '',
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
        correctAnswer: '',
        correction: '',
        correctionImage: ''
    })

    const addItem = (event) => {
        event.preventDefault()

        setQuestions(prevState => ([...prevState, questValue ]))

    }

    async function postData(event) {

        event.preventDefault()

        const data = { type, classSelected, subject, term, week, topic, questions }

        alert(`${topic}`)

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
    
    

    return (
        <StyledApp>
            <h1>Test</h1>
            <br />
            <form onSubmit={postData}>
                <div>
                    <label>Type</label>
                    <br />
                    <select onChange={(e) => setType(e.target.value)} >
                        <option value="assignment">Assignment</option>
                        <option value="mid-term test">Mid-Term test</option>
                        <option value="examination">Examination</option>
                    </select>
                </div>
                <br />
                <div>
                    <label>Class</label>
                    <br />
                    <input type="text" onChange={(e) => setClassSelected(e.target.value)}  />
                </div>
                <br />
                <div>
                    <label>Subject</label>
                    <br />
                    <input type="text" onChange={(e) => setSubject(e.target.value)} />
                </div>
                <br />
                <div>
                    <label>Term</label>
                    <br />
                    <input type="text" onChange={(e) => setTerm(e.target.value)}  />
                </div>
                <br />
                <div>
                    <label>Week</label>
                    <br />
                    <input type="text" onChange={(e) => setWeek(e.target.value)}  />
                </div>
                <br />
                <div>
                    <label>Topic</label>
                    <br />
                    <input type="text" onChange={(e) =>  setTopic(e.target.value)} />
                </div>
                <br />
                <div>
                    <label>Questions</label>
                    <br />
                    <br />
                    <div>
                        <div className="questions">
                            <div className="question">

                                <input type="text"
                                 placeholder="id"
                                 onChange={(e) => setQuestValue({...questValue,
                                    id: e.target.value
                                 })} 
                                 />
                                <input type="text"
                                 placeholder="question"
                                 onChange={(e) => setQuestValue({...questValue,
                                    question: e.target.value
                                 })} 
                                />
                                <input type="text"
                                 placeholder="answerA"
                                 onChange={(e) => setQuestValue({...questValue,
                                    answerA: e.target.value
                                 })} 
                                 />
                                <input type="text"
                                 placeholder="answerB"
                                 onChange={(e) => setQuestValue({...questValue,
                                    answerB: e.target.value
                                 })} 
                                 />
                                <input type="text"
                                 placeholder="answerC"
                                 onChange={(e) => setQuestValue({...questValue,
                                    answerC: e.target.value
                                 })} 
                                 />
                                <input type="text"
                                 placeholder="answerD"
                                 onChange={(e) => setQuestValue({...questValue,
                                    answerD: e.target.value
                                 })} 
                                 />
                                <input type="text"
                                 placeholder="correctAnswer"
                                 onChange={(e) => setQuestValue({...questValue,
                                    correctAnswer: e.target.value
                                 })} 
                                 />
                                <input type="text"
                                 placeholder="correction"
                                 onChange={(e) => setQuestValue({...questValue,
                                    correction: e.target.value
                                 })} 
                                 />
                                <input type="text"
                                 placeholder="correctionImage"
                                 onChange={(e) => setQuestValue({...questValue,
                                    correctionImage: e.target.value
                                 })} 
                                />
                            </div>
                        </div>
                        <button style={{float: "right"}} onClick={addItem} >Add</button>
                        <div>
                            {
                                questions.map((data, index) => (
                                    <div key={index} style={{ margin: "2em 0em", padding: "1em", background: "#eee", color: "#000" }}>
                                        <h5>{data.id}</h5>
                                        <h5>{data.question}</h5>
                                        <h5>{data.answerA}</h5>
                                        <h5>{data.answerB}</h5>
                                        <h5>{data.answerC}</h5>
                                        <h5>{data.answerD}</h5>
                                        <h5>{data.answerC}</h5>
                                        <h5>{data.correctAnswer}</h5>
                                        <h5>{data.correction}</h5>
                                        <h5>{data.correctionImage}</h5>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <button style={{marginTop: "6em"}} type="submit">Submit</button>
            </form>
        </StyledApp>
    )

}

export default App;