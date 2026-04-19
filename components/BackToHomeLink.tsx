import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export function BackToHomeLink() {
  return (
    <Section as="div" space="md">
      <Link href="/">
        <Text as="span" size="sm">
          {"← Back home"}
        </Text>
      </Link>
    </Section>
  );
}
