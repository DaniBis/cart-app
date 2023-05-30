import * as React from 'react';
import { ShoppingCart } from "phosphor-react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Bar = styled.nav`
  font-size: 18px;
  background: #EEE; 
  @media (min-width: 768px) {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    height: 70px;
    align-items: center;
  }
`
const MainNav = styled.ul`
  list-style-type: none;
  display: ${ props => props.display };
  flex-direction: column;
  margin: 0;

  @media (min-width: 768px) {
    display: flex !important;
    margin-right: 30px;
    flex-direction: row;
    justify-content: flex-end; 
  }
`
const NavLi = styled.li`
  text-align: center;
  margin: 15px auto;
` 
const NavLink = styled(Link)`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {    
    margin: 0px 10px;
  }
`
const NavBarToggle = styled.span`
  position: ${props => props.position}; 
  top: 10px;
  right: 20px;
  cursor: pointer; 
  color: rgba(255,255,255,0.8);
  font-size: 24px;
`
const Hamburger = styled.img`
  /* add your menu icon here i.e. */
  /* content: url('../static/Hamburger_icon.svg'); */
  content: url(data:image/svg+xml,%3Csvg%20height%3D%2232px%22%20id%3D%22Layer_1%22%20style%3D%22enable-background%3Anew%200%200%2032%2032%3B%22%20version%3D%221.1%22%20viewBox%3D%220%200%2032%2032%22%20width%3D%2232px%22%20xml%3Aspace%3D%22preserve%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cpath%20d%3D%22M4%2C10h24c1.104%2C0%2C2-0.896%2C2-2s-0.896-2-2-2H4C2.896%2C6%2C2%2C6.896%2C2%2C8S2.896%2C10%2C4%2C10z%20M28%2C14H4c-1.104%2C0-2%2C0.896-2%2C2%20%20s0.896%2C2%2C2%2C2h24c1.104%2C0%2C2-0.896%2C2-2S29.104%2C14%2C28%2C14z%20M28%2C22H4c-1.104%2C0-2%2C0.896-2%2C2s0.896%2C2%2C2%2C2h24c1.104%2C0%2C2-0.896%2C2-2%20%20S29.104%2C22%2C28%2C22z%22%2F%3E%3C%2Fsvg%3E);
  @media (min-width: 768px) {
    display: none;
  }
`

export default class Navbar extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        displayNav: props.displayNav ? "flex" : "none",
        changePosition: props.changePosition ? "absolute" : "inherit",
        isHamburgerVisible: false,
      };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
  
    componentDidMount() {
      window.addEventListener("resize", this.updateWindowDimensions);
      this.updateWindowDimensions();
    }
  
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateWindowDimensions);
    }
  
    updateWindowDimensions() {
      if (window.innerWidth <= 768 && !this.state.isHamburgerVisible) {
        this.setState({ isHamburgerVisible: true });
      } else if (window.innerWidth > 768 && this.state.isHamburgerVisible) {
        this.setState({ isHamburgerVisible: false });
      }
    }
  
    toggleNavBar() {
      this.setState((prevState) => {
        const newDisplayNav = prevState.displayNav === "none" ? "flex" : "none";
        return { displayNav: newDisplayNav };
      });
    }
  
    render() {
      const { isHamburgerVisible, changePosition } = this.state;
      return (
        <Bar>
          <NavBarToggle
            onClick={() => this.toggleNavBar()}
            position={isHamburgerVisible ? "absolute" : "inherit"}
          >
            <Hamburger />
          </NavBarToggle>
          <MainNav display={isHamburgerVisible ? this.state.displayNav : "flex"}>
            <NavLi>
              <NavLink to="/">Shop</NavLink>
            </NavLi>
            <NavLi>
              <NavLink to="/cart">
                <ShoppingCart size={24} />
              </NavLink>
            </NavLi>
          </MainNav>
        </Bar>
      );
    }
  }
  