document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ELEMENTOS
    ========================== */

    const loginScreen =
        document.getElementById("loginScreen");

    const app =
        document.getElementById("app");

    const loginForm =
        document.getElementById("loginForm");

    const logoutButton =
        document.getElementById("logoutButton");

    const menuItems =
        document.querySelectorAll(
            ".menu-item[data-page]"
        );

    const pageButtons =
        document.querySelectorAll(
            "[data-page-button]"
        );

    const pages =
        document.querySelectorAll(".page");

    const pageTitle =
        document.getElementById("pageTitle");

    const pageSubtitle =
        document.getElementById("pageSubtitle");

    const menuToggle =
        document.getElementById("menuToggle");

    const sidebar =
        document.querySelector(".sidebar");


    /* =========================
       LOGIN

       NÃO EXISTE VERIFICAÇÃO
       DE E-MAIL OU SENHA.
    ========================== */

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            loginScreen.classList.add("hidden");

            app.classList.remove("hidden");

            showPage("dashboard");
        }
    );


    /* =========================
       LOGOUT
    ========================== */

    logoutButton.addEventListener(
        "click",
        function () {

            app.classList.add("hidden");

            loginScreen.classList.remove("hidden");

        }
    );


    /* =========================
       PÁGINAS
    ========================== */

    const pageData = {

        dashboard: {
            title: "Dashboard",
            subtitle: "Visão geral do sistema"
        },

        horarios: {
            title: "Horários",
            subtitle:
                "Consulte e gerencie os horários acadêmicos"
        },

        instrutores: {
            title: "Instrutores",
            subtitle:
                "Gerencie os instrutores cadastrados"
        },

        salas: {
            title: "Salas",
            subtitle:
                "Consulte as salas e espaços disponíveis"
        },

        cadastros: {
            title: "Cadastros",
            subtitle:
                "Gerencie os cadastros do sistema"
        },

        movimentacoes: {
            title: "Movimentações",
            subtitle:
                "Histórico de movimentações do sistema"
        },

        relatorios: {
            title: "Relatórios",
            subtitle:
                "Gere relatórios do sistema"
        },

        perfil: {
            title: "Meu perfil",
            subtitle:
                "Gerencie suas informações pessoais"
        }

    };


    function showPage(pageName) {

        pages.forEach(function (page) {

            page.classList.remove(
                "active-page"
            );

        });


        const page =
            document.getElementById(pageName);


        if (page) {

            page.classList.add(
                "active-page"
            );

        }


        menuItems.forEach(function (item) {

            item.classList.remove("active");


            if (
                item.dataset.page === pageName
            ) {

                item.classList.add("active");

            }

        });


        if (pageData[pageName]) {

            pageTitle.textContent =
                pageData[pageName].title;

            pageSubtitle.textContent =
                pageData[pageName].subtitle;

        }


        sidebar.classList.remove("open");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =========================
       MENU LATERAL
    ========================== */

    menuItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                showPage(
                    item.dataset.page
                );

            }
        );

    });


    /* =========================
       BOTÕES DE NAVEGAÇÃO
    ========================== */

    pageButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                showPage(
                    button.dataset.pageButton
                );

            }
        );

    });


    /* =========================
       MENU MOBILE
    ========================== */

    menuToggle.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle("open");

        }
    );


    /* =========================
       ESQUECI A SENHA
    ========================== */

    const forgotPassword =
        document.getElementById(
            "forgotPassword"
        );


    forgotPassword.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            alert(
                "O acesso é livre. Não é necessário informar e-mail ou senha."
            );

        }
    );


    /* =========================
       MODAL
    ========================== */

    const modal =
        document.getElementById("modal");

    const closeModal =
        document.getElementById("closeModal");

    const cancelModal =
        document.getElementById("cancelModal");

    const saveModal =
        document.getElementById("saveModal");

    const newSchedule =
        document.getElementById("newSchedule");

    const newInstructor =
        document.getElementById("newInstructor");


    function openModal(title) {

        document.getElementById(
            "modalTitle"
        ).textContent = title;


        document.getElementById(
            "modalName"
        ).value = "";


        document.getElementById(
            "modalDescription"
        ).value = "";


        modal.classList.add("active");

    }


    function closeModalFunction() {

        modal.classList.remove("active");

    }


    newSchedule.addEventListener(
        "click",
        function () {

            openModal("Novo horário");

        }
    );


    newInstructor.addEventListener(
        "click",
        function () {

            openModal("Novo instrutor");

        }
    );


    closeModal.addEventListener(
        "click",
        closeModalFunction
    );


    cancelModal.addEventListener(
        "click",
        closeModalFunction
    );


    document
        .querySelector(".modal-overlay")
        .addEventListener(
            "click",
            closeModalFunction
        );


    saveModal.addEventListener(
        "click",
        function () {

            const name =
                document.getElementById(
                    "modalName"
                ).value.trim();


            if (!name) {

                alert(
                    "Digite um nome."
                );

                return;

            }


            alert(
                "Cadastro salvo com sucesso!"
            );


            closeModalFunction();

        }
    );


    /* =========================
       FILTROS
    ========================== */

    const filterCourse =
        document.getElementById(
            "filterCourse"
        );

    const filterDate =
        document.getElementById(
            "filterDate"
        );

    const filterPeriod =
        document.getElementById(
            "filterPeriod"
        );

    const clearFilters =
        document.getElementById(
            "clearFilters"
        );


    function filterSchedules() {

        const course =
            filterCourse.value.toLowerCase();


        const rows =
            document.querySelectorAll(
                "#scheduleTable tr"
            );


        rows.forEach(function (row) {

            const text =
                row.textContent.toLowerCase();


            if (
                course === "" ||
                text.includes(course)
            ) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    }


    filterCourse.addEventListener(
        "change",
        filterSchedules
    );


    filterDate.addEventListener(
        "change",
        filterSchedules
    );


    filterPeriod.addEventListener(
        "change",
        filterSchedules
    );


    clearFilters.addEventListener(
        "click",
        function () {

            filterDate.value = "";

            filterCourse.value = "";

            filterPeriod.value = "";

            filterSchedules();

        }
    );


    /* =========================
       RELATÓRIOS
    ========================== */

    document
        .querySelectorAll(".generate-report")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    alert(
                        "Relatório gerado com sucesso!"
                    );

                }
            );

        });


    /* =========================
       AÇÕES DA TABELA
    ========================== */

    document
        .querySelectorAll(".table-action")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    alert(
                        "Opções do registro."
                    );

                }
            );

        });


    /* =========================
       PÁGINA INICIAL
    ========================== */

    showPage("dashboard");

});