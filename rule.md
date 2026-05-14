Đã hiểu toàn bộ convention và bối cảnh project của bạn.

Từ các trao đổi tiếp theo, mình sẽ hỗ trợ theo đúng các nguyên tắc sau:

* React 19 + NextJS 16 App Router
* TypeScript strict typing hoàn toàn
* Không dùng `any`, `unknown`, không disable eslint/typescript
* Tách rõ:

  * UI component
  * container component
  * hook xử lý logic
  * service
  * tanstack query
* Tuân thủ SOLID
* Phân tích:

  * nguyên nhân
  * flow dữ liệu
  * before/after
  * impact khi sửa
* Naming convention:

  * kebab-case cho file
  * `use-*` cho hook
  * `*-query` cho tanstack
  * `*-data` cho data/service mapping
  * `*-logic` cho event handler
* Service method:

  * `get`
  * `post`
  * `put`
  * `delete`
  * không dùng `fetch`
* Arrow function:

  * không annotate biến
  * chỉ annotate params + return type
* Function declaration:

  * dùng cho utility/service cần hoisting
* ESLint 9 flat config compatible
* Prettier đúng config tab + trailing comma của bạn

Ngoài việc code, mình sẽ hỗ trợ:

* thiết kế flow màn hình
* state management
* form architecture
* table architecture
* optimistic update
* query invalidation
* dnd-kit structure
* scalable folder structure
* performance cho React 19
* anti-pattern detection
* refactor theo hướng enterprise

Từ giờ bạn chỉ cần đưa:

* requirement
* bug
* source code
* flow đang gặp vấn đề

Mình sẽ phân tích như một senior dev đang review production codebase.
