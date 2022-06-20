import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import Title from "./components/Title/Title"
import Footer from "./components/Footer/Footer"
import Alert from "./components/Alert/Alert"


describe("Test PPI", () => {
  beforeAll(()=> jest.spyOn(window, "fetch"))

  it("Renderizado Footer", async () => {
    const msg = "Conversion from US Dollar to Euro - Last updated: Today"
    const view = render(<Footer msg={msg}></Footer>)
    expect(view.container).toHaveTextContent(msg)
  })

  it("Renderizado Title", async () => {
    const values = {
      amount: "1.00",
      from: ["US Dollar","$","USD"],
      to: ["Euro","€","EUR"],
    }
    const view = render(<Title value={values}></Title>)
    expect(view.container).toHaveTextContent("Convert 1.00 US Dollar to Euro - $ to €")
  })

  it("Renderizado Alert", async () => {
    const msg = "We use the market rate. This is for informational purposes only."
    const view = render(<Alert msg={msg}></Alert>)
    expect(view.container).toHaveTextContent(msg)
  })

  it("Chequea peticion de las coins a la API.", async () => {
    render(<App/>)
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenCalledWith("https://api.vatcomply.com/currencies")
  })

  it("Chequea peticion de los rates a la API.", async () => {
    render(<App/>)
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenCalledWith("https://api.vatcomply.com/rates?base=USD")
  })

  it("Chequea catch al realizar peticion a la API.", async () => {
    window.fetch.mockRejectedValueOnce();
    render(<App/>);
    expect(await screen.findByText("An error has occurred. Please try again later.")).toBeInTheDocument();
  })
})
