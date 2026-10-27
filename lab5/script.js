    // Cada exercício está dentro de um bloco ( () => {...} )() para que
    // as variáveis de um não entrem em conflito com as de outro.

    // 1. BOTÕES DE CORES
    (() => {
    const frase = document.getElementById("frase");

    document.querySelectorAll("button.color").forEach((button) => {
    button.addEventListener("click", () => {
    frase.style.color = button.dataset.color;
});
});
})();

    // 2. SELECT COR DA PÁGINA
    // Aqui mantém-se "function" (e não arrow) porque o enunciado pede o "this":
    // as arrow functions não têm "this" próprio, por isso ele não seria o select.
    (() => {
    document.querySelector("#cor-pagina").addEventListener("change", function () {
        document.body.style.backgroundColor = this.value;
    });
})();

    // 3. SELECT FLEX (mesma razão: usa "this", logo "function")
    (() => {
    document.querySelector("#direcao").addEventListener("change", function () {
        document.querySelector("#container").style.flexDirection = this.value;
    });
})();

    // 4. FORMULÁRIO
    (() => {
    document.querySelector("#formulario").onsubmit = (e) => {
        e.preventDefault();

        const nome = document.querySelector("#nome").value;
        const idade = document.querySelector("#idade").value;

        document.querySelector("#mensagem").textContent = `Olá, o ${nome} tem ${idade}!`;
    };
})();

    // 5. CONTADOR COM LOCAL STORAGE
    (() => {
    // variáveis
    const display = document.querySelector("#contador-ls");
    const btnIncrementar = document.querySelector("#incrementar");
    const btnDecrementar = document.querySelector("#decrementar");
    const btnReset = document.querySelector("#reset-ls");

    let contador = Number(localStorage.getItem("contador")) || 0;

    // event handlers
    const atualizar = () => {
    display.textContent = contador;
    localStorage.setItem("contador", contador);
};
    const incrementar = () => { contador++; atualizar(); };
    const decrementar = () => { contador--; atualizar(); };
    const reset = () => { contador = 0; atualizar(); };

    // event listeners
    btnIncrementar.addEventListener("click", incrementar);
    btnDecrementar.addEventListener("click", decrementar);
    btnReset.addEventListener("click", reset);

    atualizar();
})();

    // 6. TEMPORIZADOR
    (() => {
    // variáveis
    const display = document.querySelector("#contador-timer");
    const btnParar = document.querySelector("#parar");
    const btnRetomar = document.querySelector("#retomar");
    const btnReset = document.querySelector("#reset-timer");

    let contador = 0;
    let intervalo = null;

    // event handlers
    const count = () => {
    contador++;
    display.textContent = contador;
};
    const iniciar = () => {
    if (intervalo === null) {
    intervalo = setInterval(count, 1000);
}
};
    const parar = () => {
    clearInterval(intervalo);
    intervalo = null;
};
    const reset = () => {
    contador = 0;
    display.textContent = contador;
};

    // event listeners
    btnParar.addEventListener("click", parar);
    btnRetomar.addEventListener("click", iniciar);
    btnReset.addEventListener("click", reset);

    iniciar();
})();
