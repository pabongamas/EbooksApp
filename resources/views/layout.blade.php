<!DOCTYPE html>
<html>

<head>
    <title>@yield('title')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>

    </style>
    <link rel="icon" href="/img/ebook.png">
    <link rel="stylesheet" type="text/css" href="/css/app.css">
    <script type="text/javascript" src="/js/app.js"></script>
    <script src="{{ asset('funciones/frontEnd.js') }}" defer></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.21/datatables.min.css" />
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.21/datatables.min.js"></script>
    @yield('script')
</head>

<body>
    <!-- -- aqui metemos todo el contenido dentro de un div con id app para que no solucione el error
        app.js:38355 [Vue warn]: Cannot find element: #app -- -->
    <div id="app" class="d-flex flex-column h-screen justify-content-between">
        <sidebar>
            @include('partials/nav')
        </sidebar>
        @guest
        @endguest
        @yield('content')
    </div>
</body>
@include('partials/footer')

</html>