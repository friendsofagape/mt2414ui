import { AfterViewChecked, AfterViewInit, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
/**
 * Slick component
 */
export declare class SlickCarouselComponent implements OnDestroy, OnChanges, AfterViewInit, AfterViewChecked {
    private el;
    private zone;
    config: any;
    afterChange: EventEmitter<any>;
    beforeChange: EventEmitter<any>;
    breakpoint: EventEmitter<any>;
    destroy: EventEmitter<any>;
    init: EventEmitter<any>;
    $instance: any;
    currentIndex: number;
    slides: any[];
    initialized: boolean;
    private _removedSlides;
    private _addedSlides;
    /**
     * Constructor
     */
    constructor(el: ElementRef, zone: NgZone);
    /**
     * On component destroy
     */
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    /**
     * On component view checked
     */
    ngAfterViewChecked(): void;
    /**
     * init slick
     */
    initSlick(): void;
    addSlide(slickItem: SlickItemDirective): void;
    removeSlide(slickItem: SlickItemDirective): void;
    /**
     * Slick Method
     */
    slickGoTo(index: number): void;
    slickNext(): void;
    slickPrev(): void;
    slickPause(): void;
    slickPlay(): void;
    unslick(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
export declare class SlickItemDirective implements OnInit, OnDestroy {
    el: ElementRef;
    private platformId;
    private carousel;
    constructor(el: ElementRef, platformId: string, carousel: SlickCarouselComponent);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
