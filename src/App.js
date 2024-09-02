// import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import Controller from './Components/Controller';
import Screen from './Components/Screen';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

class App extends Component {

  constructor() {
    super();

    this.state = {
      menu: {
        songs: <FontAwesomeIcon icon={fas.faMusic} size="2xl" style={{ color: "#ee91dd", }} />,
        games: <FontAwesomeIcon icon={fas.faGamepad} size="2xl" style={{ color: "#0c3279", }} />,
        settings: <FontAwesomeIcon icon={fas.faGear} size="2xl" style={{ color: "#75777a", }} />,
        Volume: <FontAwesomeIcon icon="fa-solid fa-volume-low" size="2xl" style={{ color: "#FFD43B", }} />,
        Themes: <FontAwesomeIcon icon={fas.faPalette} size="2xl" style={{ color: "#e85454", }} />
      },
      currOption: 1,
      name: ["Songs", "Games", "Settings", "Volume", "Themes"],
      showMenu: true
    };

    this.switchOption = this.switchOption.bind(this);
  }

  switchOption(id) {
    this.setState({ currOption: id });
    // console.log(this.state.menu[this.state.currOption]);

  }

  switchMenuVisiblity = () => {
    this.setState({ showMenu: !this.state.showMenu });
  }

  render() {
    return (
      <div className="App flex justify-center items-center h-[100%] w-[100%]" >
        <div className='m-[50px] w-[200px] h-[350px] rounded-md bg-slate-400 flex flex-col item-center'>
          {/* screen */}
          <Screen name={this.state.name} currOption={this.state.currOption}
            menu={this.state.menu} showMenu={this.state.showMenu} />
          {/* controller for on screen display */}
          <Controller switchOption={this.switchOption} currOption={this.state.currOption}
            menu={this.state.menu} showMenu={this.state.showMenu}
            switchMenuVisiblity={this.switchMenuVisiblity} />
        </div>
      </div>
    );
  }
}

export default App;
