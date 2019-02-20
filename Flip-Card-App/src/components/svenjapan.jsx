import React, { Component } from 'react'
import { Grid, Col, Image } from 'react-bootstrap';
import './sventhai.css';
import Card2 from '../Card/Card2';
import DrawButton from '../DrawButton/DrawButton';
import firebase from 'firebase/app';
import 'firebase/database';

import { DB_CONFIG2 } from '../confiq/firebase/db_confiq2';

export default class News extends Component {
  constructor(props){
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG2);
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
        japan: snap.val().japan,
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
             <Card2 japan={this.state.currentCard.japan}
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
