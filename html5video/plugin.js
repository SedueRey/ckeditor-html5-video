CKEDITOR.plugins.add('html5video', {
  requires: 'widget',
  lang: 'bg,ca,de,de-ch,en,eu,es,ru,uk,fr,ko,pt,pt-br,pl,zh-cn',
  icons: 'html5video',
  hidpi: true,
  init(editor) {
    editor.widgets.add('html5video', {
      button: editor.lang.html5video.button,
      template: '<div class="ckeditor-html5-video"></div>',
      /*
        * Allowed content rules (http://docs.ckeditor.com/#!/guide/dev_allowed_content_rules):
        *  - div-s with text-align,float,margin-left,margin-right inline style rules and required
        * ckeditor-html5-video class.
        *  - video tags with src, controls, width and height attributes.
        */
      allowedContent: 'div[data-responsive](!ckeditor-html5-video){text-align,float,margin-left,margin-right}; video[src,poster,controls,autoplay,width,height,loop,muted]{max-width,height};',
      requiredContent: 'div(ckeditor-html5-video); video[src];',
      upcast(element) {
        return element.name === 'div' && element.hasClass('ckeditor-html5-video');
      },
      dialog: 'html5video',
      init() {
        const defaultConfig = {
          src : '',
          autoplay : false,
          loop : '',
          controls : true,
          align : this.element.getStyle('text-align'),
          width : '',
          height : '',
          poster : '',
          allowdownload : false,
          advisorytitle : '',
          responsive : '',
          muted : false,
        };

        const config = CKEDITOR.tools.extend(defaultConfig, editor.config.html5video || {}, true);

        // If there's a child (the video element)
        if (this.element.getChild(0)) {
          // get it's attributes.
          config.src = this.element.getChild(0).getAttribute('src');
          config.width = this.element.getChild(0).getAttribute('width');
          config.height = this.element.getChild(0).getAttribute('height');
          config.autoplay = this.element.getChild(0).getAttribute('autoplay');
          config.allowdownload = !this.element.getChild(0).getAttribute('controlslist');
          config.loop = this.element.getChild(0).getAttribute('loop');
          config.advisorytitle = this.element.getChild(0).getAttribute('title');
          config.controls = this.element.getChild(0).getAttribute('controls');
          config.responsive = this.element.getAttribute('data-responsive');
          config.poster = this.element.getChild(0).getAttribute('poster');
          config.muted = this.element.getChild( 0 ).getAttribute( 'muted' );
        }

        if (config.src) {
          this.setData('src', config.src);

          if (config.align) {
            this.setData('align', config.align);
          } else {
            this.setData('align', 'none');
          }

          if (config.width) {
            this.setData('width', config.width);
          }

          if (config.height) {
            this.setData('height', config.height);
          }

          if (config.autoplay) {
            this.setData('autoplay', 'yes');
          }

          if (config.allowdownload) {
            this.setData('allowdownload', 'yes');
          }

          if (config.loop) {
            this.setData('loop', 'yes');
          }

          if (config.advisorytitle) {
            this.setData('advisorytitle', config.advisorytitle);
          }

          if (config.responsive) {
            this.setData('responsive', config.responsive);
          }

          if (config.controls) {
            this.setData('controls', config.controls);
          }

          if (config.poster) {
            this.setData('poster', config.poster);
          }

          if (config.muted) {
            this.setData('poster', config.muted);
          }
        }
      },
      data() {
        // If there is an video source
        if (this.data.src) {
          // and there isn't a child (the video element)
          if (!this.element.getChild(0)) {
            // Create a new <video> element.
            const videoElement = new CKEDITOR.dom.element('video');
            // Set the controls attribute.
            if (this.data.controls) {
              videoElement.setAttribute('controls', 'controls');
            }
            // Append it to the container of the plugin.
            this.element.append(videoElement);
          }
          this.element.getChild(0).setAttribute('src', this.data.src);
          if (this.data.width) this.element.getChild(0).setAttribute('width', this.data.width);
          if (this.data.height) this.element.getChild(0).setAttribute('height', this.data.height);

          if (this.data.responsive) {
            this.element.setAttribute('data-responsive', this.data.responsive);
            this.element.getChild(0).setStyle('max-width', '100%');
            this.element.getChild(0).setStyle('height', 'auto');
          } else {
            this.element.removeAttribute('data-responsive');
            this.element.getChild(0).removeStyle('max-width');
            this.element.getChild(0).removeStyle('height');
          }

          if (this.data.poster) this.element.getChild(0).setAttribute('poster', this.data.poster);
        }

        this.element.removeStyle('float');
        this.element.removeStyle('margin-left');
        this.element.removeStyle('margin-right');

        if (this.data.align === 'none') {
          this.element.removeStyle('text-align');
        } else {
          this.element.setStyle('text-align', this.data.align);
        }

        if (this.data.align === 'left') {
          this.element.setStyle('float', this.data.align);
          this.element.setStyle('margin-right', '10px');
        } else if (this.data.align === 'right') {
          this.element.setStyle('float', this.data.align);
          this.element.setStyle('margin-left', '10px');
        }

        if (this.element.getChild(0)) {
          if (this.data.autoplay === 'yes') {
            this.element.getChild(0).setAttribute('autoplay', 'autoplay');
          } else {
            this.element.getChild(0).removeAttribute('autoplay');
          }

          if (this.data.loop === 'yes') {
            this.element.getChild(0).setAttribute('loop', 'loop');
          } else {
            this.element.getChild(0).removeAttribute('loop');
          }

          if (this.data.allowdownload === 'yes') {
            this.element.getChild(0).removeAttribute('controlslist');
          } else {
            this.element.getChild(0).setAttribute('controlslist', 'nodownload');
          }

          if (this.data.advisorytitle) {
            this.element.getChild(0).setAttribute('title', this.data.advisorytitle);
          } else {
            this.element.getChild(0).removeAttribute('title');
          }

          if (this.data.controls) {
            this.element.getChild(0).setAttribute('controls', 'controls');
          } else {
            this.element.getChild(0).removeAttribute('controls');
          }
        }
      },
    });

    if (editor.contextMenu) {
      editor.addMenuGroup('html5videoGroup');
      editor.addMenuItem('html5videoPropertiesItem', {
        label: editor.lang.html5video.videoProperties,
        icon: 'html5video',
        command: 'html5video',
        group: 'html5videoGroup',
      });

      editor.contextMenu.addListener((element) => {
        if (element && element.getChild(0)
          && element.getChild(0).hasClass
          && element.getChild(0).hasClass('ckeditor-html5-video')) {
          return {
            html5videoPropertiesItem: CKEDITOR.TRISTATE_OFF,
          };
        }
        return null;
      });
    }

    CKEDITOR.dialog.add('html5video', `${this.path}dialogs/html5video.js`);
  },
});
