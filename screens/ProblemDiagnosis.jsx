import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ipAdd, springPort } from '../global functions and info/global'
import axios from 'axios'
import { forwardChain } from '../global functions and info/ForwardChain'
import { useNavigation } from '@react-navigation/native'

const ProblemDiagnosis = () => {

    const [finish, setFinish] = useState(false)
    const [nextId, setNextId] = useState(0)
    const [assertions, setAssertions] = useState([])
    const [KB, setKB] = useState([])
    const [decisionTree, setDecisionTree] = useState([])
    const [inferences, setInferences] = useState([])

    // Info to maps
    const [carType, setCarType] = useState('')
    const [problem, setProblem] = useState('all')

    const navigation = useNavigation()

    useEffect(() => {
        // Call the API
        // Get Knowledge-Base
        axios.get(`http://${ipAdd}:${springPort}/gatAllKB/`).then(response => {
            let temp = []
            response.data.map(row => {
                let getRule = JSON.parse(row.rule)
                let obj = {
                    id: row.id,
                    premises: getRule.premises,
                    conclusion: getRule.conclusion
                }
                temp.push(obj)
            })
            setKB(temp)
            // console.log(temp)
            // console.log(response.data)
        })

        // Get Decision-Tree
        axios.get(`http://${ipAdd}:${springPort}/getAllQuestions`).then(response => {
            let temp = []
            response.data.map(row => {
                let getQuestion = JSON.parse(row.question)
                let obj = {
                    id: row.id,
                    questionAttribute: getQuestion.questionAttribute,
                    questionText: getQuestion.questionText,
                    choices: [...getQuestion.choices]
                }
                temp.push(obj)
            })
            setDecisionTree(temp)
        })
    }, [])

    const matching = () => {
        setCarType(assertions[1].value)     // From first assertion
        let response = forwardChain(KB, assertions)
        for (let i = 0; i < response.inferences.length; i += 1) {
            console.log(response.inferences[i])
            if (response.inferences[i].attribute == 'Maintenance' || response.inferences[i].attribute == 'Electrical') {
                setProblem(response.inferences[i].attribute)
            }
        }
        // console.log(response)
        setInferences(response.inferences)
    }

    useEffect(() => {
        if (finish) {
            matching()
        }
    }, [finish])

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image
                    source={require('../assets/images/working.jpg')}
                    style={styles.image}
                />

                {!finish ? (
                    <Text style={styles.mainTitle}>
                        Please answer all the questions to recognize your problem
                    </Text>
                ) : null}

                {/* Display the result from forward chaining algorithm */}
                {
                    finish ? (
                        <View>
                            <Text style={styles.thanks}>
                                Thanks for your time, we will recognize your problem and help you to choose a garage
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Available Garages', {
                                inference: { carType: carType, problem: problem }
                            })}>
                                <Text style={styles.goMap}>Go to Map</Text>
                            </TouchableOpacity>
                            <View style={styles.result}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 22,
                                    color: 'red'
                                }}>
                                    Results and solutions:
                                </Text>
                                {
                                    inferences.length < 1 ? (
                                        <Text style={{ textAlign: 'center', fontSize: 18 }}>
                                            No Inference realized
                                        </Text>
                                    ) : null
                                }
                            </View>

                            {
                                inferences.map((inference, index) => {
                                    return (
                                        <TouchableOpacity style={styles.inference}>
                                            <Text style={styles.inferenceText}>
                                                Result ({index + 1}):
                                            </Text>
                                            <Text style={styles.inferenceText}>
                                                Inference: {inference.attribute}
                                            </Text>
                                            <Text style={styles.inferenceText}>
                                                Details: {inference.value}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    ) : null
                }

                {/* User Interface */}
                {decisionTree.length != 0 && nextId > -1 && !finish ? (
                    <View style={styles.questionView}>
                        <Text style={styles.questionText}>
                            {decisionTree[nextId].questionText}
                        </Text>
                        {
                            decisionTree[nextId].choices.map(choice => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        let assertionsCopy = [...assertions]
                                        assertionsCopy.push({
                                            attribute: decisionTree[nextId].questionAttribute,
                                            value: choice.choiceText
                                        })
                                        // console.log(assertionsCopy)
                                        setAssertions(assertionsCopy)
                                        for (let i = 0; i < decisionTree.length; i += 1) {
                                            if (decisionTree[i].id == choice.nextQuestion) {
                                                setNextId(i)
                                            } else if (choice.nextQuestion < 0) {
                                                setFinish(true)
                                                // console.log('assertions ========== ')
                                                // console.log(assertions)
                                            }
                                        }
                                    }}>
                                        <Text style={styles.choice}>
                                            {choice.choiceText}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                ) : null}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dfe6e9',
    },
    image: {
        width: '100%',
        height: 210,
    },
    mainTitle: {
        fontSize: 22,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
        backgroundColor: '#b2bec3',
        borderRadius: 5,
    },
    thanks: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        marginHorizontal: 10,
        color: '#d63031',
        fontWeight: 'bold',
        backgroundColor: '#b2bec3',
        borderRadius: 5,
        paddingVertical: 5,
        display: 'flex',
        flexDirection: 'column',
    },
    result: {
        textAlign: 'center',
        marginTop: 20,
        marginHorizontal: 10,
        color: '#d63031',
        fontWeight: 'bold',
        backgroundColor: '#b2bec3',
        borderRadius: 5,
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
    },
    goMap: {
        backgroundColor: '#636e72',
        color: '#dfe6e9',
        marginHorizontal: 10,
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        marginVertical: 10,
        borderRadius: 5,
        fontWeight: 'bold',
    },
    questionView: {
        backgroundColor: '#636e72',
        marginVertical: 20,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
    },
    questionText: {
        fontSize: 20,
        color: '#dfe6e9',
        marginBottom: 5,
        backgroundColor: '#2d3436',
        borderRadius: 5,
        padding: 5,
        fontWeight: 'bold',
    },
    choice: {
        color: '#2d3436',
        backgroundColor: '#fdcb6e',
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        fontSize: 18,
    },
    inference: {
        display: 'flex',
        marginVertical: 5,
        backgroundColor: '#fdcb6e',
        marginHorizontal: 10,
        borderRadius: 5,
        padding: 10,
    },
    inferenceText: {
        fontSize: 18,
        marginVertical: 2,
        color: '#2d3436',
        fontWeight: 'bold'
    }
})

export default ProblemDiagnosis