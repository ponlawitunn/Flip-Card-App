import React, { Component } from 'react'
import { Grid, Col, Image } from 'react-bootstrap';
import './sventhai.css';
import Card from '../Card/Card';
import DrawButton from '../DrawButton/DrawButton';
import firebase from 'firebase/app';
import 'firebase/database';

import { DB_CONFIG } from '../confiq/firebase/db_config';

export default class About extends Component {
  constructor(props){
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('cards');
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
      currentCard: {} 
    }
  }
  componentWillMount(){
    console.log(this.app.database().ref().child('cards'))
    const currentCards = this.state.cards;
    this.database.on('child_added', snap => {
      currentCards.push({
        id: snap.key,
        thai: snap.val().thai,
        sven: snap.val().sven,
        uttalar: snap.val().uttalar,
      })

      this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards)
      })

    })
  }

  getRandomCard(currentCards){
    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];
    if(card === this.state.currentCard){
      this.getRandomCard(currentCards)
    }

    return(card);
  }

  updateCard(){
    const currentCards = this.state.cards;
    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    })
  }


  render() {
    return (
      <div>
        <Grid>
          <Col xs={12} sm={8} smOffset={2}>
           <div className="cardRow">
               <Card thai={this.state.currentCard.thai}
                     sven={this.state.currentCard.sven}
                     uttalar={this.state.currentCard.uttalar}
            />
           </div>
           <div className="buttonRow">
              <DrawButton drawCard={this.updateCard}/>
           </div>
          </Col>
        </Grid>
      </div>
    )
  }
}
