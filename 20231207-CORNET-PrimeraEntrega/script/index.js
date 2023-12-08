let providerButton = document.getElementById("providers");
let inventoryButton = document.getElementById("inventory");
let orderButton = document.getElementById("orders");
let homeButton = document.getElementById("home");
let productModule = document.getElementById("product-module");
let providerModule = document.getElementById("provider-module");
let orderModule = document.getElementById("order-module");
let homeModule = document.getElementById("home-module");
let clearProvider = document.getElementById("clear-provider");
let clearProduct = document.getElementById("clear-product");
let clearOrder = document.getElementById("clear-order");
let providerForm = document.querySelector("#provider-module form");
let orderForm = document.querySelector("#order-module form");
let productForm = document.querySelector("#product-module form");

clearProvider.addEventListener("click", ()=>{
    providerForm.reset();
})

clearProduct.addEventListener("click", ()=>{
    productForm.reset();
})

clearOrder.addEventListener("click", ()=>{
    orderForm.reset();
})

const eliminarProveedor = (codigoProveedor) => {
    let proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    const indexProveedor = proveedores.findIndex(proveedor => proveedor.codigo === codigoProveedor);

    if (indexProveedor !== -1) {
        proveedores.splice(indexProveedor, 1);
        localStorage.setItem("proveedores", JSON.stringify(proveedores));
        llenarTablaProveedores();
        llenarTablaProductos();
    } else {
        console.log("Proveedor no encontrado");
    }
};

const eliminarProducto = (skuProducto) => {
    let proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    let productoEncontrado = false;

    proveedores.forEach(proveedor => {
        const indexProducto = proveedor.productos.findIndex(producto => producto.sku === skuProducto);
        
        if (indexProducto !== -1) {
            proveedor.productos.splice(indexProducto, 1);
            productoEncontrado = true;
        }
    });

    if (productoEncontrado) {
        localStorage.setItem("proveedores", JSON.stringify(proveedores));
        llenarTablaProductos();
    } else {
        console.log("Producto no encontrado");
    }
};

const eliminarOrden = (numeroOrden) => {
    let ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
    const indexOrden = ordenes.findIndex(orden => orden.numeroOrden === numeroOrden);

    if (indexOrden !== -1) {
        ordenes.splice(indexOrden, 1);
        localStorage.setItem("ordenes", JSON.stringify(ordenes));
        llenarTablaOrdenes();
    } else {
        console.log("Orden no encontrada");
    }
};

let navigation = (e) => {
    e.preventDefault();

    let modulesArray = Array.from(document.querySelectorAll(".module"));
    modulesArray.forEach(module => {
        module.classList.add("d-none");
    });

    let linksArray = Array.from(document.getElementsByClassName("nav-link"));
    linksArray.forEach(link => {
        if (!link.classList.contains("link-dark")) {
            link.classList.add("link-dark");
        }
        link.classList.remove("active");
    });

    e.target.classList.add("active");
    e.target.classList.remove("link-dark");

    if (e.target === providerButton) {
        providerModule.classList.remove("d-none");
    } else if (e.target === inventoryButton) {
        productModule.classList.remove("d-none");
    } else if (e.target === orderButton) {
        orderModule.classList.remove("d-none");
    } else if(e.target === homeButton){
        homeModule.classList.remove("d-none")
    }
};

const actualizarSelectProveedores = () => {
    const selectProveedor = document.getElementById("codigo-proveedor");
    let proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    selectProveedor.innerHTML = "";

    const defaultOptionProveedor = document.createElement('option');
    defaultOptionProveedor.value = '';
    defaultOptionProveedor.text = 'Elegir proveedor';
    selectProveedor.appendChild(defaultOptionProveedor);

    proveedores.forEach((proveedor) => {
        const option = document.createElement('option');
        option.value = proveedor.codigo;
        option.text = proveedor.codigo;
        selectProveedor.appendChild(option);
    });
};

const actualizarSelectOrdenes = () => {
    const selectProveedor = document.getElementById("codigo-proveedor-orden");
    const selectProducto = document.getElementById("nombre-producto-orden");
    let proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    selectProveedor.innerHTML = '';
    selectProducto.innerHTML = '';

    const defaultOptionProveedor = document.createElement("option");
    defaultOptionProveedor.value = '';
    defaultOptionProveedor.text = "Elegir proveedor";
    selectProveedor.appendChild(defaultOptionProveedor);

    const defaultOptionProducto = document.createElement("option");
    defaultOptionProducto.value = '';
    defaultOptionProducto.text = "Elegir producto";
    selectProducto.appendChild(defaultOptionProducto);

    proveedores.forEach((proveedor) => {
        const optionProveedor = document.createElement("option");
        optionProveedor.value = proveedor.codigo;
        optionProveedor.text = proveedor.codigo;
        selectProveedor.appendChild(optionProveedor);
    });

    selectProveedor.addEventListener("change", () => {
        let codigoProveedor = selectProveedor.value;
        const indexProveedorEncontrado = proveedores.findIndex(proveedor => codigoProveedor === proveedor.codigo);
        selectProducto.innerHTML = '';
        
        if (indexProveedorEncontrado !== -1) {
                const defaultOptionProducto = document.createElement("option");
                defaultOptionProducto.value = "";
                defaultOptionProducto.text = "Elegir producto";
                selectProducto.appendChild(defaultOptionProducto);
                proveedores[indexProveedorEncontrado].productos.forEach(producto => {
                const optionProducto = document.createElement("option");
                optionProducto.value = producto.nombreProducto;
                optionProducto.text = producto.nombreProducto;
                selectProducto.appendChild(optionProducto);
            });
        }
    });
};

providerButton.addEventListener("click", navigation);
inventoryButton.addEventListener("click", navigation);
inventoryButton.addEventListener("click", actualizarSelectProveedores)
homeButton.addEventListener("click", navigation);
orderButton.addEventListener("click", navigation);
orderButton.addEventListener("click", actualizarSelectOrdenes)


providerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const codigo = document.querySelector('#codigo').value;
    const razonSocial = document.querySelector('#razon_social').value;
    const rubro = document.querySelector('#rubro').value;
    const sitioWeb = document.querySelector('#sitio_web').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const direccion = document.querySelector('#direccion').value;
    const cp = document.querySelector('#cp').value;
    const localidad = document.querySelector('#localidad').value;
    const provincia = document.querySelector('#provincia').value;
    const pais = document.querySelector('#pais').value;
    const cuit = document.querySelector('#cuit').value;
    const condicionIVA = document.querySelector('#condicion_iva').value;
    const nombreContacto = document.querySelector('#nombre_contacto').value;
    const apellidoContacto = document.querySelector('#apellido_contacto').value;
    const telefonoContacto = document.querySelector('#telefono_contacto').value;
    const emailContacto = document.querySelector('#email_contacto').value;
    const rolContacto = document.querySelector('#rol_contacto').value;

    let proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    const codigoRepetido = proveedores.some(proveedor => proveedor.codigo === codigo);
    const telefonoEsNumero = !isNaN(telefono);
    const cuitEsNumero = !isNaN(cuit);
    if (codigoRepetido) {
        alert('El código del proveedor ya está en uso. Proporciona un código único.');
    } else if (!telefonoEsNumero) {
        alert('El teléfono debe ser numérico.');
    } else if (!cuitEsNumero) {
        alert('El CUIT debe ser numérico.');
    } else {
        const nuevoProveedor = {
            codigo,
            razonSocial,
            rubro,
            sitioWeb,
            email,
            telefono,
            direccion,
            cp,
            localidad,
            provincia,
            pais,
            cuit,
            condicionIVA,
            nombreContacto,
            apellidoContacto,
            telefonoContacto,
            emailContacto,
            rolContacto,
            productos : []
        };
        proveedores.push(nuevoProveedor);
        localStorage.setItem("proveedores", JSON.stringify(proveedores));
        providerForm.reset();
        llenarTablaProveedores();
        actualizarSelectOrdenes()
    }
});

productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    const codigoProveedor = document.getElementById("codigo-proveedor").value;
    const sku = document.getElementById("sku").value;
    const categoria = document.getElementById("categoria").value;
    const nombreProducto = document.getElementById("nombre-producto").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;

    const precioEsNumero = !isNaN(parseFloat(precio));
    const skuUnico = !proveedores.some(proveedor => proveedor.productos.some(producto => producto.sku === sku));

    if (!precioEsNumero) {
        alert("El precio debe ser un valor numérico.");
    } else if (!skuUnico) {
        alert("El SKU ingresado ya existe. Proporciona un SKU único.");
    } else {
        const nuevoProducto = {
            codigoProveedor,
            sku,
            categoria,
            nombreProducto,
            descripcion,
            precio: parseFloat(precio)
        };

        const proveedorEncontrado = proveedores.find(proveedor => proveedor.codigo === codigoProveedor);

        if (proveedorEncontrado) {
            proveedorEncontrado.productos = proveedorEncontrado.productos || [];
            proveedorEncontrado.productos.push(nuevoProducto);

            localStorage.setItem("proveedores", JSON.stringify(proveedores));
            productForm.reset();
            llenarTablaProductos();
        } else {
            alert("El código del proveedor no existe");
        }
    }
    actualizarSelectOrdenes();
});


//Recordatorio: agregar por cada objeto del array en la key proveedores un atributo llamado ordenes en el que se guarde un array de objetos donde se agregaran las ordenes generadas por el orderForm.
//Esto sirve para que cuando se elimine un proveedor tambien se eliminen todas las ordenes generadas en las que coincide 
//proveedor.ordenes.orden.codigoProveedorOrden con proveedor.codigo 
//Por cuestiones de tiempo esto no se contempló desde un inicio
orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const numeroOrden = document.getElementById("order").value;
    const fechaEmision = document.getElementById("fecha-emision").value;
    const fechaEntrega = document.getElementById("fecha-entrega").value;
    const direccionOrden = document.getElementById("direccion-orden").value;
    const codigoProveedorOrden = document.getElementById("codigo-proveedor-orden").value;
    const nombreProductoOrden = document.getElementById("nombre-producto-orden").value;
    const cantidadOrden = document.getElementById("cantidad").value;
    const totalOrden = document.getElementById("total").innerText;

    const orden = {
        numeroOrden,
        fechaEmision,
        fechaEntrega,
        direccionOrden,
        codigoProveedorOrden,
        nombreProductoOrden,
        cantidadOrden,
        totalOrden
    };

    let ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];

    ordenes.push(orden);

    localStorage.setItem("ordenes", JSON.stringify(ordenes));

    orderForm.reset();
    document.getElementById("total").innerText=""
    llenarTablaOrdenes();
});

    const llenarTablaProveedores = () => {
        const proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
        proveedoresBody.innerHTML = "";
        proveedores.forEach(proveedor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${proveedor.codigo}</td>
                <td>${proveedor.razonSocial}</td>
                <td>${proveedor.rubro}</td>
                <td>${proveedor.sitioWeb}</td>
                <td>${proveedor.email}</td>
                <td>${proveedor.telefono}</td>
                <td>${proveedor.direccion}</td>
                <td>${proveedor.cuit}/${proveedor.condicionIVA}</td>
                <td>${proveedor.cp}</td>
                <td>${proveedor.localidad}</td>
                <td>${proveedor.provincia}</td>
                <td>${proveedor.pais}</td>
                <td>
                    <button onclick="editarProveedor('${proveedor.codigo}')">Editar</button>
                    <button onclick="eliminarProveedor('${proveedor.codigo}')">Eliminar</button>
                </td>
            `;
            proveedoresBody.appendChild(row);
        });
    };

    const llenarTablaProductos = () => {
        const proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
        productosBody.innerHTML = "";
        proveedores.forEach(proveedor => {
            proveedor.productos.forEach(producto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${proveedor.codigo}</td>
                    <td>${producto.sku}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.nombreProducto}</td>
                    <td>${producto.descripcion}</td>
                    <td>$${producto.precio}</td>
                    <td>
                        <button onclick="editarProducto('${producto.sku}')">Editar</button>
                        <button onclick="eliminarProducto('${producto.sku}')">Eliminar</button>
                    </td>
                `;
                productosBody.appendChild(row);
            });
        });
    };

    const llenarTablaOrdenes = () => {
        const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
        ordenesBody.innerHTML = "";
        ordenes.forEach(orden => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${orden.numeroOrden}</td>
                <td>${orden.fechaEmision}</td>
                <td>${orden.fechaEntrega}</td>
                <td>${orden.direccionOrden}</td>
                <td>${orden.codigoProveedorOrden}</td>
                <td>${orden.nombreProductoOrden}</td>
                <td>${orden.cantidadOrden}</td>
                <td>$${orden.totalOrden}</td>
                <td>
                    <button onclick="editarOrden('${orden.numeroOrden}')">Editar</button>
                    <button onclick="eliminarOrden('${orden.numeroOrden}')">Eliminar</button>
                </td>
            `;
            ordenesBody.appendChild(row);
        });
    };

    const obtenerPrecioProductoSeleccionado = () => {
        const productoSeleccionado = document.getElementById("nombre-producto-orden").value;
        const proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    
        let precio = 0;
    
        proveedores.forEach(proveedor => {
            const productos = proveedor.productos || [];
            const productoEncontrado = productos.find(item => item.nombreProducto === productoSeleccionado);
    
            if (productoEncontrado) {
                precio = parseFloat(productoEncontrado.precio);
            }
        });
    
        return precio;
    };

    

    document.getElementById("nombre-producto-orden").addEventListener("change", () => {
        const precioProductoSeleccionado = obtenerPrecioProductoSeleccionado();
        const cantidad = parseFloat(document.getElementById("cantidad").value) || 0;
        
        const total = precioProductoSeleccionado * cantidad;
    
        document.getElementById("total").innerText = total.toFixed(2);
    });
    document.getElementById("cantidad").addEventListener("change", () => {
        const precioProductoSeleccionado = obtenerPrecioProductoSeleccionado();
        const cantidad = parseFloat(document.getElementById("cantidad").value) || 0; 
        
        const total = precioProductoSeleccionado * cantidad; 
    
        document.getElementById("total").innerText = total.toFixed(2);
    });

    const proveedoresBody = document.querySelector("#proveedores-body tbody");
    const productosBody = document.querySelector("#productos-body tbody");
    const ordenesBody = document.querySelector("#ordenes-body tbody");
    const proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
    llenarTablaProveedores();
    llenarTablaProductos();
    llenarTablaOrdenes();