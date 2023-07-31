<?php

namespace App\Twig\Extension;

use App\Twig\Runtime\ThemeExtensionRuntime;
use Twig\TwigFunction;
use Twig\Extension\AbstractExtension;

class ThemeExtension extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('image_with_theme', [ThemeExtensionRuntime::class, 'getImage']),
        ];
    }
}
