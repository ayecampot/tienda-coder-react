import Hero1 from "../../images/fondo-1.png"
import Hero2 from "../../images/fondo-2.png"
import Hero3 from "../../images/fondo-3.png"

const Hero = () => {
  
      return (
  
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Hero1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={Hero2} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={Hero3} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      );
    }
  ;

export default Hero;