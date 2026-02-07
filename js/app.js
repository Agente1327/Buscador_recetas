document.addEventListener("DOMContentLoaded", iniciarApp);

function iniciarApp() {
    obtenerCategorias();

    const selectCategorias = document.querySelector("#categorias");
    selectCategorias.addEventListener("change", seleccionarCategoria);
}

// =============================
// Obtener categorías desde API
// =============================
function obtenerCategorias() {

    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarCategorias(resultado.categories));
}

// =============================
// Mostrar categorías en select
// =============================
function mostrarCategorias(categorias = []) {

    const select = document.querySelector("#categorias");

    categorias.forEach(categoria => {

        const option = document.createElement("option");
        option.value = categoria.strCategory;
        option.textContent = categoria.strCategory;

        select.appendChild(option);
    });
}

// =============================
// Cuando selecciona categoría
// =============================
function seleccionarCategoria(e) {

    const categoria = e.target.value;

    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarRecetas(resultado.meals));
}

// =============================
// Mostrar recetas
// =============================
function mostrarRecetas(recetas = []) {

    limpiarHTML();

    const contenedor = document.querySelector("#resultado");

    recetas.forEach(receta => {

        const { idMeal, strMeal, strMealThumb } = receta;

        const col = document.createElement("div");
        col.classList.add("col-md-4");

        col.innerHTML = `
            <div class="card mb-4">
                <img class="card-img-top" src="${strMealThumb}" alt="${strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${strMeal}</h5>
                    <button 
                        class="btn btn-danger w-100"
                        onclick="seleccionarReceta(${idMeal})"
                    >
                        Ver Receta
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(col);
    });
}

// =============================
// Obtener receta completa
// =============================
function seleccionarReceta(id) {

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarRecetaModal(resultado.meals[0]));
}

// =============================
// Mostrar modal receta
// =============================
function mostrarRecetaModal(receta) {

    const { strMeal, strInstructions, strMealThumb } = receta;

    const modalTitulo = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".modal-body");

    modalTitulo.textContent = strMeal;

    modalBody.innerHTML = `
        <img class="img-fluid mb-3" src="${strMealThumb}" />
        <p>${strInstructions}</p>
    `;

    const modal = new bootstrap.Modal(document.querySelector("#modal"));
    modal.show();
}

// =============================
// Limpiar resultados
// =============================
function limpiarHTML() {
    const contenedor = document.querySelector("#resultado");

    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}

// =============================
// TOAST FAVORITOS (opcional)
// =============================
function mostrarToast(mensaje) {

    const toastBody = document.querySelector(".toast-body");
    toastBody.textContent = mensaje;

    const toast = new bootstrap.Toast(document.querySelector("#toast"));
    toast.show();
}
