import './style.css';
import SideBar from "./components/SideBar";
import Boxes from "./components/Boxes";
import {Component} from "react";


export default class App extends Component {
    state = {
        boxes: [
            {id: 1, name: 'Box 1', isActive: true},
            {id: 2, name: 'Box 2', isActive: false},
            {id: 3, name: 'Box 3', isActive: true},
            {id: 4, name: 'Box 4', isActive: false},
            {id: 5, name: 'Box 5', isActive: false},
            {id: 6, name: 'Box 6', isActive: false},
        ]
    }

    handleToggleClick = (id) => {
        const unAvailableBoxes = this.state.boxes.filter((value) => !value.isActive)
        if (unAvailableBoxes.length === this.state.boxes.length - 1) {
            const remindBox = this.state.boxes.filter((value) => value.id === id)[0]
            if (remindBox.isActive) {
                alert("Can't turn of all boxes")
                return
            }
        }
        //Copy main list To prevent from updating that.
        const updatedList = [...this.state.boxes]
        updatedList.forEach((box) => {
            if (box.id === id) {
                box.isActive = !box.isActive
            }
        })

        this.setState(state => {
            return {updatedList}
        })
    }

    render() {
        return (
            <>
                <SideBar boxes={this.state.boxes} handleToggleClick={this.handleToggleClick}/>
                <Boxes boxes={this.state.boxes}/>
            </>
        )
    }
}
