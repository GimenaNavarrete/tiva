import Vue from 'vue'
import Card from './Card'
import Child from './Child'
import Button from './Button'
import Checkbox from './Checkbox'
import InputSpinner from './InputSpinner'
import ProductQuantitySpinner from './ProductQuantitySpinner'
import { HasError, AlertError, AlertSuccess } from 'vform'

// Components that are registered globaly.
[
  Card,
  Child,
  Button,
  Checkbox,
  HasError,
  AlertError,
  AlertSuccess,
  InputSpinner,
  ProductQuantitySpinner
].forEach(Component => {
  Vue.component(Component.name, Component)
})
