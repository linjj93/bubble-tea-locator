import React from "react";
import "../../styles/DrinkAdder.css";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Modal,
  ModalHeader
} from "reactstrap";

function DrinkAdder({
  handleChange,
  handleDateBought,
  handleStore,
  handleToppings,
  addDrink,
  modalIsOpen,
  closeForm
}) {
  const closeBtn = (
    <button className="close" onClick={closeForm}>
      &times;
    </button>
  );
  return (
    <Modal isOpen={modalIsOpen} className="drink-modal">
      <ModalHeader close={closeBtn} className="modal-header">
        Add your Drink!
      </ModalHeader>
      <Form>
        <FormGroup row>
          <Label for="drink" sm={4}>
            Drink
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              name="drink"
              id="drink"
              placeholder="Add your drink here"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="price" sm={4}>
            Price
          </Label>
          <Col sm={8}>
            <Input
              type="number"
              name="price"
              id="price"
              placeholder="Price of drink"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="sugar-level" sm={4}>
            Sugar Level (%)
          </Label>
          <Col sm={8}>
            <Input
              type="number"
              name="sugarLevel"
              id="sugar-level"
              placeholder="In percentage"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="topping" sm={4}>
            Store
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              name="store"
              id="store"
              placeholder="Which Store?"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="topping" sm={4}>
            Toppings
          </Label>
          <div className="checkboxes">
            <CustomInput
              type="checkbox"
              id="white-pearl"
              label="White Pearl"
              onChange={handleToppings}
            />
            <CustomInput
              type="checkbox"
              id="black-pearl"
              label="Black Pearl"
              onChange={handleToppings}
            />
            <CustomInput
              type="checkbox"
              id="jelly"
              label="Jelly"
              onChange={handleToppings}
            />
          </div>
        </FormGroup>
        <FormGroup row>
          <Label for="date-bought" sm={4}>
            Date
          </Label>
          <Col sm={8}>
            <Input
              type="date"
              name="date-bought"
              id="exampleText"
              onChange={handleDateBought}
            />
          </Col>
        </FormGroup>
        <Button color="primary" onClick={addDrink}>
          Add Drink!
        </Button>{" "}
      </Form>
    </Modal>
  );
}

export default DrinkAdder;
