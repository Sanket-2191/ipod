import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default class Controller extends Component {
    constructor() {
        super();
        this.state = { index: 0, isDragging: false, startY: 0 };
    }
    // console.log();

    switchTo = () => {
        const { switchOption } = this.props;
        switchOption(this.state.index);
    }

    handlePointerDown = (e) => {
        this.setState({ isDragging: true, startY: e.clientY });
    }

    handlePointerMove = (e) => {
        if (this.state.isDragging) {
            const { startY } = this.state;
            const currentY = e.clientY;
            const diffY = currentY - startY;

            const threshold = 20; // Adjust this value for sensitivity control

            if (diffY > threshold) {
                this.moveDown();
                this.setState({ startY: currentY }); // Reset the start point to prevent too fast movement
            } else if (diffY < -threshold) {
                this.moveUp();
                this.setState({ startY: currentY }); // Reset the start point to prevent too fast movement
            }
        }
    }

    handlePointerUp = () => {
        this.setState({ isDragging: false });
    }

    moveUp = () => {
        const { menu } = this.props;
        this.setState({ index: this.state.index <= 0 ? Object.keys(menu).length - 1 : this.state.index - 1 }, () => {
            this.switchTo();
        });
    }

    moveDown = () => {
        const { menu } = this.props;
        this.setState({ index: this.state.index >= Object.keys(menu).length - 1 ? 0 : this.state.index + 1 }, () => {
            this.switchTo();
        });
    }

    handleSelect = (e) => {
        e.stopPropagation(); // Stops the event from propagating to parent elements
        // console.log('Inner div clicked, event propagation stopped.');
        this.menuVisiblity();
    }

    menuVisiblity = () => {
        const { switchMenuVisiblity } = this.props;
        switchMenuVisiblity();

    }

    componentDidMount() {
        this.setState({ index: this.props.currOption });
    }

    render() {
        const { showMenu } = this.props;
        // console.log("showmenu", showMenu);

        return (
            <>
                <div
                    className="flex flex-col justify-around items-center w-[40%] m-auto bg-red-300 rounded-full"
                    onPointerDown={this.handlePointerDown}
                    onPointerMove={this.handlePointerMove}
                    onPointerUp={this.handlePointerUp}
                    onPointerLeave={this.handlePointerUp} // To handle the case when pointer leaves the element
                    style={{ height: "28%", touchAction: "none" }}
                >
                    <div className="flex justify-center items-center w-[100%] h-[25%] text-[10px]">
                        <FontAwesomeIcon icon={showMenu ? fas.faFolderOpen : fas.faFolder} size="xl" onClick={this.menuVisiblity} />
                    </div>
                    {/* 3 buttons in line */}
                    <div className="flex justify-between items-center w-[100%] h-[40%] text-[10px]" >
                        <div className="flex justify-center items-center w-[25%] h-[100%] m-auto text-[10px]">
                            <FontAwesomeIcon icon={fas.faBackwardStep} />
                        </div>
                        {/* "fa-solid fa-backward-step" */}

                        <div className="flex justify-center items-center w-[40%] h-[100%] m-auto bg-red-400 rounded-full text-[10px]"
                            onPointerDown={this.handleSelect}><FontAwesomeIcon icon={fas.faCheck} />
                        </div>

                        <div className="flex justify-center items-center w-[25%] h-[100%] m-auto text-[10px]">
                            <FontAwesomeIcon icon={fas.faForwardStep} />
                        </div>
                    </div>

                    <div className="flex justify-center items-center w-[100%] h-[25%] text-[10px]"><FontAwesomeIcon icon={fas.faPlay} /><FontAwesomeIcon icon={fas.faSlash} /><FontAwesomeIcon icon={fas.faPause} /></div>

                </div>
            </>
        );
    }
}
