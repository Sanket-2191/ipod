import { Component } from "react";

export default class Screen extends Component {


    render() {
        const { name, currOption, menu, showMenu } = this.props;
        const selectedKey = name[currOption].toLowerCase();
        console.log(`${name[currOption]}`, menu[currOption]);

        return (<>
            <div className="mx-[5%] my-[5%] w-[90%] h-[50%] bg-black" >
                {
                    showMenu ? <div className={`flex flex-col justify-start items-center mx-[0px] my-[0px] w-[45%] h-[100%] bg-slate-500 `}>
                        {
                            name.map((n, i) =>
                                <div className={`flex justify-center items-center mx-[2%] my-auto w-[96%] ${currOption === i ? 'bg-red-100' : 'bg-slate-500'}`}
                                    key={i} style={{ height: `${100 / name.length}%` }}>
                                    {n}
                                </div>
                            )
                        }
                    </div> : <div className={`flex flex-col justify-center items-center mx-[0px] my-[0px] w-[100%] h-[100%] bg-green-300 `}>
                        {menu[selectedKey]}
                    </div>
                }
            </div>
        </>)
    }
}