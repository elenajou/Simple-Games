import { calculateInvestmentResults, formatter } from "../util/investment";

export default function Results({ input }) {
  const resultsData = calculateInvestmentResults(input);
  const initialInvestment = resultsData[0].valueEndOfYear - resultsData[0].interest - resultsData[0].annualInvestment;
  console.log(resultsData);

  return <table id="result">
    <thead>
      <tr>
        <th>Year</th>
        <th>Investment Value</th>
        <th>Interest (Year)</th>
        <th>Total</th>
        <th>Invested Capital</th>
      </tr>
    </thead>
    <tbody>
      {resultsData.map(yearData => {
        const { valueEndOfYear, annualInvestment, interest, year } = yearData;
        const totalInterest = valueEndOfYear - annualInvestment * year - initialInvestment;
        const totalAmountInvested = valueEndOfYear - totalInterest;
        return <tr key={year}>
          <td>{year}</td>
          <td>{formatter.format(valueEndOfYear)}</td>
          <td>{formatter.format(interest)}</td>
          <td>{formatter.format(totalInterest)}</td>
          <td>{formatter.format(totalAmountInvested)}</td>
        </tr>
      })}
    </tbody>
  </table>;

}