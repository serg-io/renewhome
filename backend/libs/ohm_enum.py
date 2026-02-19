from enum import Enum, EnumMeta, unique


class OhmMetaEnum(EnumMeta):
    """
    Adds some useful functionality for printing and comparison of Enums
    """

    def __contains__(self: "OhmMetaEnum", member: object) -> bool:
        try:
            if not isinstance(self, OhmMetaEnum):
                return False
            self(member)
            return True
        except:
            return False

@unique
class OhmStrEnum(str, Enum, metaclass=OhmMetaEnum):
    """
    Adds some useful functionality for printing and comparison of Enums with string values
    """

    def __str__(self) -> str:
        return self.value
