"use client"
import React, { useContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import UserContext from "@/contexts/usercontext";
import {
  warningAlert
} from "@/components/Toast";
import BounceText from "./BounceText";
import BounceImage from "./BounceImage";

export default function Home() {
  const { currentAmount, setCurrentAmount, tokenFilterList, selectedTokenList, setSelectedTokenList, swapTokenList, setSwapTokenList } = useContext<any>(UserContext);
  const { publicKey } = useWallet();
  const [allSelectedFlag, setAllSelectedFlag] = useState<boolean | null>(false);

  const changeToken = () => {
    if (publicKey?.toBase58() === undefined || publicKey?.toBase58() === '') {
      warningAlert("please connect wallet")
      return;
    }
    if (selectedTokenList.length === 0) {
      warningAlert("You must select at least one token")
      return;
    } else {
      setSwapTokenList(selectedTokenList)
    }
  }

  useEffect(() => {
    if (selectedTokenList.length === tokenFilterList.length && tokenFilterList.length !== 0) {
      setAllSelectedFlag(true)
    }
  }, [selectedTokenList])

  const updateCheckState = (id: string, amount: number) => {
    if (selectedTokenList.some((_token: any) => _token.id === id)) {
      setSelectedTokenList(selectedTokenList.filter((_token: any) => _token.id != id));
      setAllSelectedFlag(false);
    } else {
      setSelectedTokenList([...selectedTokenList, { id, amount }]);
      let _allSelectedToken: { id: String, amount: number }[] = [...selectedTokenList, { id, amount }];
      selectedTokenList.forEach((element: any) => {
        if (!_allSelectedToken.some((token: any) => token.id === element.id)) {
          _allSelectedToken.push({ id: element.id, amount: element.amount });
        }
      });
    }
  };

  const handleAllSelectedCheckBox = () => {
    if (allSelectedFlag === false) {
      // If no items are selected, select all
      let _selectedToken: { id: String, amount: number }[] = [];
      tokenFilterList.forEach((token: any) => {
        _selectedToken.push({ id: token.id, amount: currentAmount });
      });

      // Set the selectedTokenList to the array of selected tokens
      setSelectedTokenList(_selectedToken);
      setAllSelectedFlag(true); // Set the state to "checked"
    } else if (allSelectedFlag === true) {
      // If all items are selected, deselect all
      setSelectedTokenList([]);
      setAllSelectedFlag(false); // Set the state to "unchecked"
    } else {
      // If it's indeterminate, clear the selection (or implement logic based on your needs)
      setSelectedTokenList([]);
      setAllSelectedFlag(false); // Move to "unchecked"
    }
  };

  const handleAmountChangeEnd = (e: any) => {
    const finalValue = e.target.value; // Capture the final value from the slider
    setCurrentAmount(finalValue); // Update the currentAmount to the final value
  };

  return (
    <div className="w-full h-full flex flex-row items-center pb-6 relative">
      <div className="container">
        <div className="lg:flex hidden">
          <BounceImage
            width={100}
            height={100}
            style={"absolute bottom-7 left-10 z-10"}
          />
          <BounceImage
            width={100}
            height={100}
            style={"absolute bottom-7 right-10 z-10"}
          />
          <BounceImage
            width={80}
            height={80}
            style={"absolute bottom-40 left-24 z-10"}
          />
          <BounceImage
            width={80}
            height={80}
            style={"absolute bottom-40 right-24 z-10"}
          />
          <BounceImage
            width={50}
            height={50}
            style={"absolute bottom-14 left-40 z-10"}
          />
          <BounceImage
            width={50}
            height={50}
            style={"absolute bottom-14 right-40 z-10"}
          />
        </div>
        <BounceText text="additional&nbsp;TOKE&nbsp;by&nbsp;closing&nbsp;empty&nbsp;token&nbsp;account" />
        <div className="flex flex-col items-center justify-between w-full h-full rounded-xl border-[1px] border-[#26c3ff] max-w-4xl mx-auto py-6 gap-4 z-20 relative">
          <div className="w-full flex justify-between flex-col sm2:flex-row items-center h-full px-4 border-b-[1px] border-b-[#26c3ff] pb-4">
            <div className="flex flex-col text-start justify-start gap-2">
              <div className="text-2xl font-bold text-[#26c3ff]">
                SCAVENGER V1
              </div>
              <div className="text-[12px] text-white font-semibold">
                Swap your shitty shitters for $TOKE
              </div>
            </div>
            <div className="flex flex-col w-[320px] text-start justify-start gap-1 pt-6 sm2:pt-0">
              <div className="flex flex-row justify-between items-center text-[12px] text-white font-semibold">
                <p>Current Amount</p>
                <p>{currentAmount}</p>
              </div>
              <div className="flex flex-row gap-2 font-bold text-[#26c3ff]">
                <p className="text-[#26c3ff]">$</p>
                <input
                  type='range'
                  value={currentAmount}
                  min={420}
                  max={1000000} step={1}
                  onChange={(e) => handleAmountChangeEnd(e)}
                  className='bottom-0 w-full cursor-pointer' />
              </div>
              <div className="flex flex-row justify-between items-center text-[12px] text-white font-semibold">
                <p>Min : 420</p>
                <p>Max: 1M</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col px-2">
            <div className="w-full h-[400px] px-4 relative object-cover overflow-hidden overflow-y-scroll">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {tokenFilterList?.length < 1 ?
                  <div className="h-[360px] flex flex-col justify-center items-center text-[#26c3ff] text-xl font-bold px-4">
                    You currently do not have tokens
                  </div>
                  :
                  <table className="w-full max-h-[360px] text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100 object-cover overflow-hidden overflow-y-scroll">
                    <thead className="text-xs text-white uppercase bg-[#26c3ff]">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-all"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                              checked={allSelectedFlag === true} // Fully selected state
                              onChange={(e) => {
                                handleAllSelectedCheckBox();
                              }}
                            />
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Balance
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Value
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Approx cunt received
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tokenFilterList?.length === 1 &&
                        <tr className="bg-blue-500 border-b border-blue-400 cursor-pointer">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-1"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={allSelectedFlag === true} // Fully selected state
                                onChange={() => updateCheckState(tokenFilterList[0].id, currentAmount)}
                              />
                            </div>
                          </td>
                          <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                            {tokenFilterList[0].mintSymbol}
                          </th>
                          <td className="px-6 py-4">
                            {tokenFilterList[0].balance / 10 ^ tokenFilterList[0].decimal}
                          </td>
                          <td className="px-6 py-4">
                            {tokenFilterList[0].price}
                          </td>
                          <td className="px-6 py-4">
                            $ {tokenFilterList[0].balanceByToke / 1000}
                          </td>
                        </tr>
                      }
                      {tokenFilterList?.length > 1 &&
                        tokenFilterList?.map((item: any, index: number) => {
                          return (
                            <tr key={index} className="bg-blue-500 border-b border-blue-400">
                              <td className="w-4 p-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-1"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={selectedTokenList.some((token: any) => token.id === item.id)}
                                    onChange={() => {
                                      updateCheckState(item.id, currentAmount);
                                    }}
                                  />
                                </div>
                              </td>
                              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                {item.mintSymbol}
                              </th>
                              <td className="px-6 py-4">
                                {item.balance / 10 ^ item.decimal}
                              </td>
                              <td className="px-6 py-4">
                                {item.price}
                              </td>
                              <td className="px-6 py-4">
                                $ {item.balanceByToke / 1000}
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center justify-end w-full px-5">
            {/* <div className="text-white text-sm">CuntDust 0 shitters for ~ 0 $TOKE</div> */}
            <div onClick={() => changeToken()} className={`${publicKey?.toBase58() !== undefined ? "border-[#26c3ff] cursor-pointer text-[#26c3ff] hover:bg-[#26c3ff] hover:text-white" : "border-[#1c1d1d] cursor-not-allowed text-[#1c1d1d]"} text-base rounded-full border-[1px] font-semibold px-5 py-2 `}>
              SWAP
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

