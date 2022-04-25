import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

const ProblemDiagnosis = () => {

    const [finish, setFinish] = useState(false)
    const [nextId, setNextId] = useState(0)
    const [assertions, setAssertions] = useState([])
    const [decisionTree, setDecisionTree] = useState([
        {
            id: 1,
            questionText: 'Q1 mfklcmsdklcssdmmklfdlks ?',
            choices: [
                {
                    choiceText: 'Choice1',
                    nextQuestion: 1,
                },
                {
                    choiceText: 'Choice2',
                    nextQuestion: -1,
                }
            ]
        },
        {
            id: 2,
            questionText: 'Q2 ljkfndmsjkfnsdjfnsdjnfds ?',
            choices: [
                {
                    choiceText: 'Choice1',
                    nextQuestion: -1,
                },
            ]
        },
    ])

    useEffect(() => {
        // Call the API
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image
                    source={require('../assets/images/working.jpg')}
                    style={styles.image}
                />

                <Text style={styles.mainTitle}>
                    Please answer all the questions to recognize your problem
                </Text>

                {/* Display the result from forward chaining algorithm */}
                {
                    finish ? (
                        <View>
                            <Text style={styles.thanks}>
                                Thanks for your time, we will recognize your problem and help you to choose a garage
                            </Text>
                            <TouchableOpacity>
                                <Text style={styles.goMap}>Go to Map</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }

                {/* User Interface */}
                {decisionTree.length != 0 && nextId > -1 ? (
                    <View style={styles.questionView}>
                        <Text style={styles.questionText}>
                            {decisionTree[nextId].questionText}
                        </Text>
                        {
                            decisionTree[nextId].choices.map(choice => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        choice.nextQuestion == -1 ? setFinish(true) : null
                                        setNextId(choice.nextQuestion)
                                        let assertionsCopy = [...assertions]
                                        assertionsCopy.push({
                                            attribute: decisionTree[nextId].questionText,
                                            value: choice.choiceText
                                        })
                                        // console.log(assertionsCopy)
                                        setAssertions(assertionsCopy)
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
})

export default ProblemDiagnosis