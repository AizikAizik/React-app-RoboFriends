import React, { Component } from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
//import { robots } from './robots'
import Scroll from '../components/Scroll'
import './App.css'
import './loading.css'

class App extends Component {

    constructor(){
        super();
        this.state = {
            robots : [  ],
            searchField : ' '
        }
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then( response  =>  response.json())
        .then( users  => this.setState( {robots : users} ) )
    }

    onSearchChange = (event) => {
    this.setState( { searchField: event.target.value } )
    }

    render(){
        //destructuring
        const { robots, searchField } = this.state;
        const filteredRobotSearch = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        return !robots.length  ?
          (
              <div className = "wrapper">
                  <div className = "container">
                      <div className = "top-corner"></div>
                      <div className = "bottom-corner"></div>
                  </div>
                  <div className = "square"></div>
              </div>
          )
                 :
         (
            <div className="tc">
                <h1 className = "f2">RoboFriends</h1>
                <SearchBox searchchange = { this.onSearchChange } />
                <Scroll >
                    <CardList robots = { filteredRobotSearch }/>
                </Scroll>
            </div>
        )

   }
}

export default App
