import {FaHighlighter} from 'react-icons/fa'
import {
  GrAttachment,
  GrTextAlignCenter,
  GrTextAlignFull,
  GrTextAlignRight,
  GrYoutube,
} from 'react-icons/gr'
import {PortableTextImagePreview} from '../../components/portable-text-image-preview'
import {
  COLOR_DECORATORS,
  createColorIcon,
  createColorRender,
} from '../../components/portable-text-color-render'
import {HighlightRender} from '../../components/portable-text-highlight-render'
import {
  AlignCenterRender,
  AlignJustifyRender,
  AlignRightRender,
} from '../../components/portable-text-align-render'

export const content_block = {
  title: 'Content Block',
  name: 'content_block',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal Paragraph', value: 'normal'},
        {title: 'Heading 1 (Main Title)', value: 'h1'},
        {title: 'Heading 2 (Major Section)', value: 'h2'},
        {title: 'Heading 3 (Subsection)', value: 'h3'},
        {title: 'Heading 4 (Minor Subsection)', value: 'h4'},
        {title: 'Heading 5 (Small Subheading)', value: 'h5'},
        {title: 'Heading 6 (Fine Title)', value: 'h6'},
        {title: 'Lead Paragraph (Intro)', value: 'lead'},
        {title: 'Blockquote (Quote)', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullets (Bulleted List)', value: 'bullet'},
        {title: 'Numbering (Numbered List)', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold (Ctrl+B)', value: 'strong'},
          {title: 'Italic (Ctrl+I)', value: 'em'},
          {title: 'Underline (Ctrl+U)', value: 'underline'},
          {title: 'Strikethrough (Strike)', value: 'strike-through'},
          {title: 'Code Snippet (Inline Code)', value: 'code'},
          {
            title: 'Text Highlight Color (Yellow)',
            value: 'highlight',
            icon: FaHighlighter,
            component: HighlightRender,
          },
          ...COLOR_DECORATORS.map((col) => ({
            title: `Font Color: ${col.title}`,
            value: col.name,
            icon: createColorIcon(col.color),
            component: createColorRender(col.color),
          })),
          {
            title: 'Align Center',
            value: 'align-center',
            icon: GrTextAlignCenter,
            component: AlignCenterRender,
          },
          {
            title: 'Align Right',
            value: 'align-right',
            icon: GrTextAlignRight,
            component: AlignRightRender,
          },
          {
            title: 'Justify (Align Full)',
            value: 'align-justify',
            icon: GrTextAlignFull,
            component: AlignJustifyRender,
          },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Insert Hyperlink (Link Web / Email / Phone)',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'Target URL',
                description:
                  'Enter web address (https://...), email (mailto:...), or phone (tel:...)',
                validation: (Rule: any) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                    allowRelative: true,
                  }),
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Open link in new tab (_blank)',
                initialValue: true,
              },
              {
                name: 'nofollow',
                type: 'boolean',
                title: 'Add rel="nofollow" (SEO)',
                initialValue: false,
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      title: 'Picture (Image with Crop & Resize)',
      options: {
        hotspot: true,
      },
      components: {
        preview: PortableTextImagePreview,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption / Figure Note',
          description: 'Text displayed below the picture',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (Alt text for SEO & Accessibility)',
          description: 'Describe image content for search engines and screen readers',
          validation: (Rule: any) => Rule.required().warning('Alt text is recommended for SEO'),
        },
        {
          name: 'displaySize',
          type: 'string',
          title: 'Display Size / Layout Width',
          description: 'Choose display width on the page',
          initialValue: 'large',
          options: {
            list: [
              {title: 'Small (25%)', value: 'small'},
              {title: 'Medium (50%)', value: 'medium'},
              {title: 'Large (75%)', value: 'large'},
              {title: 'Full Width (100%)', value: 'full'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
        },
      ],
      preview: {
        select: {
          asset: 'asset',
          crop: 'crop',
          hotspot: 'hotspot',
          caption: 'caption',
          alt: 'alt',
          displaySize: 'displaySize',
        },
      },
    },
    {
      type: 'table',
      title: 'Table (Rows & Columns)',
    },
    {
      name: 'youtube',
      type: 'object',
      title: 'Online Video (YouTube / Vimeo Video)',
      icon: GrYoutube,
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'Video URL',
          description: 'Paste YouTube or Vimeo link (e.g. https://www.youtube.com/watch?v=...)',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Video Caption / Description',
        },
      ],
      preview: {
        select: {
          url: 'url',
          caption: 'caption',
        },
      },
    },
    {
      name: 'fileAttachment',
      type: 'object',
      title: 'File Attachment (PDF / Word / Excel / Archive Download)',
      icon: GrAttachment,
      fields: [
        {
          name: 'file',
          type: 'file',
          title: 'Upload File',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'title',
          type: 'string',
          title: 'File Display Title (e.g. Tour Brochure 2026.pdf)',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          type: 'string',
          title: 'File Summary / Size note',
        },
      ],
      preview: {
        select: {
          title: 'title',
          description: 'description',
        },
      },
    },
  ],
}
