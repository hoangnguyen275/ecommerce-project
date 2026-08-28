import { Header } from "../components/Header";
import './Error404Page.css'

export function Error404Page({ cart }){
  return (
    <>
      <Header cart={cart}/>

      <div className="not-found-page">
        Page not found
      </div>
    </>
  );
}