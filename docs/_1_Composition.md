<img alt="logo fixter" width="300" src="https://fixter.camp/static/media/geek_completo.7e1e87a7.png" />

# React composition
React tiene un potente modelo de composición, y recomendamos usar composición en lugar de herencia para reutilizar código entre componentes.

## Contención
Algunos componentes no conocen sus hijos de antemano. Esto es especialmente común para componentes como Sidebar o Dialog que representan “cajas” genéricas.

Recomendamos que estos componentes usen la prop especial children para pasar elementos hijos directamente en su resultado:
```=javascript
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```
Esto permite que otros componentes les pasen hijos arbitrarios anidando el JSX:

```=javascript
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```=javascript
Cualquier cosa dentro de la etiqueta JSX <FancyBorder> se pasa dentro del componente FancyBorder como la prop children. Como FancyBorder renderiza {props.children} dentro de un <div>, los elementos que se le han pasado aparecen en el resultado final.

Aunque es menos común, a veces puedes necesitar múltiples “agujeros” en un componente. En estos casos puedes inventarte tu propia convención en lugar de usar children:
```=javascript
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

Los elementos como <Contacts /> y <Chat /> son simplemente objetos, por lo que puedes pasarlos como props como cualquier otro dato. Este enfoque puede recordarte a “huecos” (slots) en otras bibliotecas, pero no hay limitaciones en lo que puedes pasar como props en React.

## Especialización

A veces pensamos en componentes como “casos concretos” de otros componentes. Por ejemplo, podríamos decir que un WelcomeDialog es un caso concreto de Dialog.

En React, esto también se consigue por composición, en la que un componente más “específico” renderiza uno más “genérico” y lo configura con props:

```=javascript
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

La composición funciona igual de bien para componentes definidos como clases:

```=javascript
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          ¡Apúntame!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Bienvenido abordo, ${this.state.login}!`);
  }
}
```

## ¿Entonces qué pasa con la herencia?

En Facebook usamos React en miles de componentes, y no hemos hallado ningún caso de uso en el que recomendaríamos crear jerarquías de herencia de componentes.

Las props y la composición te dan toda la flexibilidad que necesitas para personalizar el aspecto y el comportamiento de un componente de forma explícita y segura. Recuerda que los componentes pueden aceptar props arbitrarias, incluyendo valores primitivos, elementos de React y funciones.

Si quieres reutilizar funcionalidad que no es de interfaz entre componentes, sugerimos que la extraigas en un módulo de JavaScript independiente. Los componentes pueden importarlo y usar esa función, objeto, o clase, sin extenderla.

## Consideraciones con HOCs

### No uses HOCs dentro del método render

El algoritmo de detección de diferencias de React (llamado reconciliación) utiliza la identidad del componente para determinar si debe actualizar el subárbol existente o desecharlo y montar uno nuevo. Si el componente devuelto por render es idéntico (===) al componente de la llamada a render previa, React actualiza el subárbol calculando las diferencias con el nuevo. Si no son iguales, el subárbol anterior es desmontado completamente.

Normalmente no es necesario pensar acerca de esto. Pero importa para los HOCs porque significa que no puedes aplicar un HOC a un componente dentro del método render de otro componente:

```
render() {
  // Una nueva versión de EnhancedComponent es creada en cada render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // Esto causa que el subárbol entero se desmonte/monte cada vez!
  return <EnhancedComponent />;
}
```
El problema aquí mostrado no es tan solo acerca del rendimiento, desmontar un componente causa que el estado de ese componente y de todos sus hijos se pierda.

En su lugar, aplica los HOCs por fuera de la definición del componente de manera que el componente resultante se creado solo una vez. De esta forma su identidad será consistente entre llamadas a render. Esto, de todas formas, es lo que usualmente deseas.

En aquellos casos extraños donde necesites aplicar un HOC de forma dinámica, también puedes hacerlo en los métodos del ciclo de vida, o en su constructor.




## Más sobre el tema:
---
* [Documentación oficial](https://reactjs.org/docs/composition-vs-inheritance.html#gatsby-focus-wrapper)
* [Tutorial](https://programmingwithmosh.com/react/react-composition-vs-inheritance/)
* [HOCs](https://reactjs.org/docs/higher-order-components.html)
* [Don't use mixins](https://es.reactjs.org/blog/2016/07/13/mixins-considered-harmful.html)

Happy Coding!  ❤


