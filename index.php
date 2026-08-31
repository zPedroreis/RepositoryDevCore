<?php
session_start();

require_once __DIR__ . '/Controller/AuthController.php';
require_once __DIR__ . '/Controller/Dashboardcontroller.php'; 
require_once __DIR__ . '/Controller/InstrutorController.php';
require_once __DIR__ . '/Controller/MateriaController.php';

$rota = $_GET['rota'] ?? 'login';


$rotasPublicas = ['login'];
if (!in_array($rota, $rotasPublicas) && empty($_SESSION['usuario_id'])) { 
    header('Location: index.php?rota=login');
    exit;
}

switch ($rota) {
    case 'login':
        (new AuthController())->login();
        break;

    case 'logout':
        (new AuthController())->logout();
        break;

    case 'dashboard':
        (new Dashboardcontroller())->index();
        break;

    case 'instrutores':
        (new InstrutorController())->index();
        break;

    case 'materias':
        (new MateriaController())->index();
        break;

    default:
        (new Dashboardcontroller())->index();
        break;
}