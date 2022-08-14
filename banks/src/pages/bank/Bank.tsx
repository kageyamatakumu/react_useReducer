import React, { useState, useReducer } from 'react';

// stateの型
type State = {
    savings: number;
    histories: {
        operation: string;
        amount: number;
    }[]
}

// アクションの型
type Action = {
    type: 'DEPOSIT';
    payload: number;
} | {
    type: 'WITHDRAW';
    payload: number;
}

// stateの初期値
const initialState = {
    savings: 10000,
    histories: [],
}

// 新しいstateを返す。ロジックを書く。
const reducer = (state: State, action: Action) => {
    switch(action.type){
        case 'DEPOSIT':
            return {...state,
                    savings: state.savings + action.payload,
                    histories: [...state.histories,
                    { operation: '預ける', amount: action.payload }
                    ]
            }
        case 'WITHDRAW':
            return {...state,
                    savings: state.savings - action.payload,
                    histories: [...state.histories,
                        { operation: '引き出す', amount: action.payload }
                    ]
            }
        default:
            return state;
    }
}


export const Bank = () => {
    // reducer : stateを更新するための関数。stateとactionを受け取って新しいstateを返す。
    // initialState : stateの初期値
    const [state, dispatch] = useReducer(reducer, initialState);
    // 戻り値として以下の配列を返します。
    // state : state(コンポーネントの状態)
    // dispatch : reducerを実行するための呼び出し関数

    const [amount, setAmount] = useState<number>(0);

    const onDeposit = (amount: number) => {
        // dispatch : reducerを実行するための呼び出し関数
        dispatch({type: 'DEPOSIT', payload: amount})
        setAmount(0);
    }

    const onWithdraw = (amount: number) => {
        // dispatch : reducerを実行するための呼び出し関数
        dispatch({type: 'WITHDRAW', payload: amount})
        setAmount(0);
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value))
    }

    return (
        <div>
            <div>
                <h4>残高：{state.savings.toLocaleString()}円</h4>
                <div>
                    <div>
                        <input value={ amount } onChange={ (e) => inputChange(e) } type='number'/>
                        <span>円</span>
                    </div>
                    <div>
                        <button onClick ={ () => onDeposit(amount) }>預ける</button>
                        <button onClick ={ () => onWithdraw(amount) }>引き出す</button>
                    </div>
                </div>
            </div>
            <div>
                <h4>履歴</h4>
                {state.histories.map((history, index) => {
                    return(
                        <p key={index}>{history.operation}:{history.amount.toLocaleString()}円</p>
                    )
                    })}
            </div>
        </div>
    )
}
