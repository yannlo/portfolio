<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\RequestStack;

class ThemeProvider
{
    private string $theme;

    public function __construct(
        RequestStack $request,
        string $defaultTheme
    ) {
        $theme = $defaultTheme;
        if (
            !is_null($request->getCurrentRequest()->cookies)
            && !is_null($request->getCurrentRequest()->cookies->get('theme'))
        ) {
            $theme = $request->getCurrentRequest()->cookies->get('theme');
        }

        $this->theme = $theme;
    }

    public function get()
    {
        return $this->theme;
    }
}
