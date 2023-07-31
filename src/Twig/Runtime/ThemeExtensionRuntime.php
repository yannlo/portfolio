<?php

namespace App\Twig\Runtime;

use App\Service\ThemeProvider;
use Twig\Extension\RuntimeExtensionInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class ThemeExtensionRuntime implements RuntimeExtensionInterface
{
    private string $theme;
    public function __construct(
        ThemeProvider $themeProvider
    ) {
        $this -> theme = $themeProvider->get();
    }

    public function getImage(string $path, string $origin = "build")
    {
        $part = [];
        if (!empty($origin)) {
            $part[] = $origin;
        }
        $part[] = "images";
        $part[] = $this -> theme;
        $part[] = $path;

        return implode("/", $part);
    }
}
