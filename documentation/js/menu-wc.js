'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">socialbot-service documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-c3ff3875f3b5d36f2828e6ba79012d138623aa6c13f4cad01d5a7e40f41707ff3c348c1f9912169eb50e286890cb008fea3a2cd1f359bc020a30fad298e8a6cb"' : 'data-bs-target="#xs-controllers-links-module-AppModule-c3ff3875f3b5d36f2828e6ba79012d138623aa6c13f4cad01d5a7e40f41707ff3c348c1f9912169eb50e286890cb008fea3a2cd1f359bc020a30fad298e8a6cb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-c3ff3875f3b5d36f2828e6ba79012d138623aa6c13f4cad01d5a7e40f41707ff3c348c1f9912169eb50e286890cb008fea3a2cd1f359bc020a30fad298e8a6cb"' :
                                            'id="xs-controllers-links-module-AppModule-c3ff3875f3b5d36f2828e6ba79012d138623aa6c13f4cad01d5a7e40f41707ff3c348c1f9912169eb50e286890cb008fea3a2cd1f359bc020a30fad298e8a6cb"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-c3ff3875f3b5d36f2828e6ba79012d138623aa6c13f4cad01d5a7e40f41707ff3c348c1f9912169eb50e286890cb008fea3a2cd1f359bc020a30fad298e8a6cb"' : 'data-bs-target="#xs-injectables-links-module-AppModule-c3ff3875f3b5d36f2828e6ba79012d138623aa6c13f4cad01d5a7e40f41707ff3c348c1f9912169eb50e286890cb008fea3a2cd1f359bc020a30fad298e8a6cb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c3ff3875f3b5d36f2828e6ba79012d138623aa6c13f4cad01d5a7e40f41707ff3c348c1f9912169eb50e286890cb008fea3a2cd1f359bc020a30fad298e8a6cb"' :
                                        'id="xs-injectables-links-module-AppModule-c3ff3875f3b5d36f2828e6ba79012d138623aa6c13f4cad01d5a7e40f41707ff3c348c1f9912169eb50e286890cb008fea3a2cd1f359bc020a30fad298e8a6cb"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfrastructureModule.html" data-type="entity-link" >InfrastructureModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LoggerModule-cb2c7ebb34db8fb24cf8ad80ca034bfedcd8f0cfe1fa8c06a2cf7e821a9d385012c5feee974a88fa025c79b48136939b1ddd25a49682a4829ca3d4ea2511cf03"' : 'data-bs-target="#xs-injectables-links-module-LoggerModule-cb2c7ebb34db8fb24cf8ad80ca034bfedcd8f0cfe1fa8c06a2cf7e821a9d385012c5feee974a88fa025c79b48136939b1ddd25a49682a4829ca3d4ea2511cf03"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-cb2c7ebb34db8fb24cf8ad80ca034bfedcd8f0cfe1fa8c06a2cf7e821a9d385012c5feee974a88fa025c79b48136939b1ddd25a49682a4829ca3d4ea2511cf03"' :
                                        'id="xs-injectables-links-module-LoggerModule-cb2c7ebb34db8fb24cf8ad80ca034bfedcd8f0cfe1fa8c06a2cf7e821a9d385012c5feee974a88fa025c79b48136939b1ddd25a49682a4829ca3d4ea2511cf03"' }>
                                        <li class="link">
                                            <a href="injectables/CustomLoggerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomLoggerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' :
                                        'id="xs-injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-b220315d71f36848bcd625ad243f99cca94a495ca8003fe4d4e9bda8768d47fcc8333797d6fe135d5f8175ea2587656ae1e9d372d88676585af0ad837a63b424"' : 'data-bs-target="#xs-controllers-links-module-UserModule-b220315d71f36848bcd625ad243f99cca94a495ca8003fe4d4e9bda8768d47fcc8333797d6fe135d5f8175ea2587656ae1e9d372d88676585af0ad837a63b424"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-b220315d71f36848bcd625ad243f99cca94a495ca8003fe4d4e9bda8768d47fcc8333797d6fe135d5f8175ea2587656ae1e9d372d88676585af0ad837a63b424"' :
                                            'id="xs-controllers-links-module-UserModule-b220315d71f36848bcd625ad243f99cca94a495ca8003fe4d4e9bda8768d47fcc8333797d6fe135d5f8175ea2587656ae1e9d372d88676585af0ad837a63b424"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-b220315d71f36848bcd625ad243f99cca94a495ca8003fe4d4e9bda8768d47fcc8333797d6fe135d5f8175ea2587656ae1e9d372d88676585af0ad837a63b424"' : 'data-bs-target="#xs-injectables-links-module-UserModule-b220315d71f36848bcd625ad243f99cca94a495ca8003fe4d4e9bda8768d47fcc8333797d6fe135d5f8175ea2587656ae1e9d372d88676585af0ad837a63b424"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-b220315d71f36848bcd625ad243f99cca94a495ca8003fe4d4e9bda8768d47fcc8333797d6fe135d5f8175ea2587656ae1e9d372d88676585af0ad837a63b424"' :
                                        'id="xs-injectables-links-module-UserModule-b220315d71f36848bcd625ad243f99cca94a495ca8003fe4d4e9bda8768d47fcc8333797d6fe135d5f8175ea2587656ae1e9d372d88676585af0ad837a63b424"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateUserRequestDto.html" data-type="entity-link" >CreateUserRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEntity.html" data-type="entity-link" >UserEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserResponseDto.html" data-type="entity-link" >UserResponseDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});