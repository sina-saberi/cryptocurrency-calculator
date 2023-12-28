import constant from "@/src/constant";
import { currency } from "@/src/models/currency"
import { GetServerSideProps, NextPage } from "next"
import { Button, Input } from "@/src/components";
import React from "react";

interface HomeProps {
  items: currency[]
}

const Home: NextPage<HomeProps> = ({ items }) => {
  const currency = items[0];
  const [state, setState] = React.useState({
    from: 0,
    to: 0
  });


  const changeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replaceAll(",", "")) || 0;
    setState({
      from: value,
      to: Math.round(value * currency.lastAvg)
    });
  }

  const changeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replaceAll(",", "")) || 0;
    const calculatedFrom = (value / currency.lastAvg);
    const roundedCalculatedFrom = parseFloat(calculatedFrom.toFixed(6));

    setState({
      to: value,
      from: roundedCalculatedFrom
    });
  }

  const formatInputValue = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 6 })


  return (
    <main className="h-screen flex  items-center justify-center min-h-[400px]">
      <div className="w-2/3 mx-auto max-w-sm lg:max-w-none">
        <h3 className="font-bold text-2xl">{`${constant.cryptocurrencyCalculatorTo} ${currency.targetLocalizedName}`}</h3>
        <p className="text-base my-2">{`${constant.professionalToolToConvertDigitalCurrencyTo} ${currency.targetLocalizedName}`}</p>
        <div className="bg-gray-100 border-2 rounded-md p-8">
          <div className="flex w-full ">
            <div className="w-full flex items-center justify-center gap-3 flex-col lg:flex-row lg:items-end">
              <Input name="from" onChange={changeFrom} value={formatInputValue(state.from)} label={constant.iPay} badge={{ name: currency.baseLocalizedName, shorName: currency.id.split("_")[0] }} />
              <button className="bg-white rounded-full flex items-center justify-center border shadow-sm w-8 h-8 flex-shrink-0 ">
                +
              </button>
              <Input name="to" onChange={changeTo} value={formatInputValue(state.to)} label={constant.iReceive} badge={{ name: currency.targetLocalizedName, shorName: currency.id.split("_")[1] }} />
              <Button>{`${constant.buy} ${currency.baseLocalizedName}`}</Button>
            </div>
          </div>
          <p className="text-xs mt-3 flex items-center">
            <span className="w-2 h-2 bg-green-500 flex rounded-full ml-1"></span>
            {constant.theInstantPurchaseRate.replace("{amount}", "1").replace("{tax}", currency.lastAvg.toLocaleString())}
          </p>
        </div>
      </div>
    </main>
  )
}
export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch("https://api-v2.sarafi.io/api/market/list");
  const data = await response.json();
  return { props: data }
}