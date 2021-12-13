export default function PasswordList(
    props: React.PropsWithoutRef<{ password: string }>
) {
    const { password } = props;

    return <div>Test List: {password}</div>;
}
