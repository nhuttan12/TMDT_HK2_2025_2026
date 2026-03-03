'use client';

import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Button } from '@/components/ui/button';
import { JSX, useEffect } from 'react';

interface Props {
	value: string;
	onChange: (val: string) => void;
	disabled: boolean;
}

export default function RichTextEditor({
	value,
	onChange,
	disabled = false,
}: Props): JSX.Element | null {
	const editor: Editor | null = useEditor({
		extensions: [StarterKit, Underline],
		content: value,
		immediatelyRender: false,
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: 'prose max-w-none focus:outline-none min-h-[300px]',
			},
		},
	});

	useEffect((): void => {
		if (!editor) return;

		editor.setEditable(!disabled);
	}, [editor, disabled]);

	if (!editor) return null;

	return (
		<div className='shadow-sm rounded-2xl border! border-slate-100! rounded-lg'>
			{/* Toolbar */}
			{!disabled && (
				<div className='flex flex-wrap gap-2 border-b p-2 bg-muted/40'>
					<Button
						type='button'
						size='sm'
						variant={editor.isActive('bold') ? 'default' : 'outline'}
						onClick={(): boolean => editor.chain().focus().toggleBold().run()}
						disabled={disabled}
					>
						Bold
					</Button>

					<Button
						type='button'
						size='sm'
						variant={editor.isActive('italic') ? 'default' : 'outline'}
						onClick={() => editor.chain().focus().toggleItalic().run()}
						disabled={disabled}
					>
						Italic
					</Button>

					<Button
						type='button'
						size='sm'
						variant={editor.isActive('underline') ? 'default' : 'outline'}
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						disabled={disabled}
					>
						Underline
					</Button>

					<Button
						type='button'
						size='sm'
						variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
						onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						disabled={disabled}
					>
						H2
					</Button>

					<Button
						type='button'
						size='sm'
						variant={editor.isActive('bulletList') ? 'default' : 'outline'}
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						disabled={disabled}
					>
						List
					</Button>
				</div>
			)}

			{/* Editor */}
			<div className='p-4'>
				<EditorContent editor={editor} />
			</div>
		</div>
	);
}
