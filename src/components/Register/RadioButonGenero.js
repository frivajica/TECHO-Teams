import React, { Component } from "react";

 class RadioButonGenero extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.formSubmit}>
          <label for="selector" className="label">
              <p>GENERO *</p>
            </label>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Masculino"
              checked={this.state.selectedOption === "Masculino"}
              onChange={this.onValueChange}
            />
            Masculino
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Femenino"
              checked={this.state.selectedOption === "Femenino"}
              onChange={this.onValueChange}
            />
            Femenino
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Otrx"
              checked={this.state.selectedOption === "Otrx"}
              onChange={this.onValueChange}
            />
            Otrx
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Prefiero no decierlo"
              checked={this.state.selectedOption === "Prefiero no decierlo"}
              onChange={this.onValueChange}
            />
            Prefiero no decierlo
          </label>
        </div>
        
      </form>
    );
  }
}
export default RadioButonGenero